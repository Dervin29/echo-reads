'use client';

import React, { useRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { X } from 'lucide-react';
import { FileUploadFieldProps } from '@/types';
import { cn } from '@/lib/utils';

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form';

const FileUploader = <T extends FieldValues>({
    control,
    name,
    label,
    acceptTypes,
    disabled,
    icon: Icon,
    placeholder,
    hint,
}: FileUploadFieldProps<T>) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => {
                const isUploaded = !!value;

                const handleFileChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                ) => {
                    const file = e.target.files?.[0];

                    if (file) {
                        onChange(file);
                    }
                };

                const onRemove = (
                    e: React.MouseEvent
                ) => {
                    e.stopPropagation();

                    onChange(null);

                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                };

                return (
                    <FormItem className="w-full">
                        <FormLabel className="form-label">
                            {label}
                        </FormLabel>

                        <FormControl>
                            <div
                                className={cn(
                                    'upload-dropzone',
                                    isUploaded &&
                                    'upload-dropzone-uploaded'
                                )}
                                onClick={() =>
                                    !disabled &&
                                    inputRef.current?.click()
                                }
                            >
                                <input
                                    type="file"
                                    accept={acceptTypes.join(',')}
                                    className="hidden"
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    disabled={disabled}
                                />

                                {isUploaded ? (
                                    <div className="relative flex w-full flex-col items-center px-4">
                                        <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                                            <Icon className="size-6" strokeWidth={1.5} />
                                        </span>
                                        <p className="upload-dropzone-text mt-3 line-clamp-1">
                                            {(value as File).name}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={onRemove}
                                            className="upload-dropzone-remove"
                                        >
                                            <X className="h-5 w-5" strokeWidth={1.5} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <span className="mb-3 flex size-14 items-center justify-center rounded-full bg-paper-soft text-brand shadow-[inset_0_0_0_1px_var(--hairline)] transition-all duration-500 ease-premium group-hover:scale-105">
                                            <Icon className="upload-dropzone-icon !m-0 !size-6" />
                                        </span>
                                        <p className="upload-dropzone-text">
                                            {placeholder}
                                        </p>
                                        <p className="upload-dropzone-hint">
                                            {hint}
                                        </p>
                                    </>
                                )}
                            </div>
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default FileUploader;
