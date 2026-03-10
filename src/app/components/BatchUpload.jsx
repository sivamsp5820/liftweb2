import React, { useState, useRef } from 'react';
import { Upload, FileText, X, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BatchUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const processFiles = (uploadedFiles) => {
        const validFiles = Array.from(uploadedFiles).filter(file => {
            const type = file.type || '';
            const name = file.name.toLowerCase();
            return type === 'application/pdf' ||
                name.endsWith('.pdf') ||
                name.endsWith('.xlsx') ||
                name.endsWith('.xls') ||
                type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                type === 'application/vnd.ms-excel';
        });

        const newFiles = validFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.name.split('.').pop().toLowerCase(),
            status: 'uploading',
            progress: 0
        }));

        setFiles(prev => [...prev, ...newFiles]);

        // Simulate upload progress
        newFiles.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(current =>
                        current.map(f => f.id === file.id ? { ...f, progress: 100, status: 'complete' } : f)
                    );
                } else {
                    setFiles(current =>
                        current.map(f => f.id === file.id ? { ...f, progress } : f)
                    );
                }
            }, 200);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    };

    const handleFileSelect = (e) => {
        processFiles(e.target.files);
    };

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    return (
        <div className="w-full mb-12">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative group border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer overflow-hidden ${isDragging
                        ? "border-[#1CA7A6] bg-[#1CA7A6]/5"
                        : "border-border hover:border-[#1CA7A6] bg-secondary/20"
                    }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    accept=".pdf,.xlsx,.xls"
                    className="hidden"
                />

                {/* Animated Background Element */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#1CA7A6]/5 to-transparent transition-opacity duration-500 ${isDragging ? "opacity-100" : "opacity-0"}`} />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`mb-4 p-4 rounded-full transition-transform duration-500 ${isDragging ? "scale-110 bg-[#1CA7A6]/20" : "bg-card shadow-sm"}`}>
                        <Upload className={`w-8 h-8 ${isDragging ? "text-[#1CA7A6]" : "text-muted-foreground"}`} />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#1CA7A6] transition-colors">
                        Drop PDF or EXCEL here
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        Upload your project specifications or batch order files. Supported formats: PDF, XLSX, XLS.
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-3"
                    >
                        <div className="flex items-center justify-between px-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Uploaded Documents ({files.length})</span>
                            <button
                                onClick={() => setFiles([])}
                                className="text-xs text-destructive hover:underline font-medium"
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {files.map((file) => (
                                <motion.div
                                    key={file.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl shadow-sm group hover:border-[#1CA7A6]/50 transition-colors"
                                >
                                    <div className={`p-2 rounded-lg ${file.type === 'pdf' ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                                        {file.type === 'pdf' ? <FileText className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-sm font-medium truncate pr-6">{file.name}</p>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${file.progress}%` }}
                                                    className={`h-full transition-all duration-300 ${file.status === 'complete' ? "bg-green-500" : "bg-[#1CA7A6]"}`}
                                                />
                                            </div>
                                            <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">
                                                {Math.round(file.progress)}%
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-[10px] text-muted-foreground tracking-wider font-medium">{file.size}</span>
                                            {file.status === 'complete' ? (
                                                <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase tracking-tighter">
                                                    <CheckCircle2 className="w-3 h-3" /> Ready for processing
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter animate-pulse">
                                                    Processing...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
