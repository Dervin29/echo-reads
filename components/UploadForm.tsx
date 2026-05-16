"use client";

import { useRef, useState, type ElementType, type ChangeEvent, type MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Image as ImageIcon, X } from "lucide-react";

import { UploadSchema } from "@/lib/zod";
import {
  voiceOptions,
  voiceCategories,
  DEFAULT_VOICE,
} from "@/lib/constants";

import type { BookUploadFormValues } from "@/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/LoadingOverlay";

const UploadForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      file: undefined,
      cover: undefined,
      title: "",
      author: "",
      voiceId: DEFAULT_VOICE,
    },
  });

  const onSubmit = async (values: BookUploadFormValues) => {
    setSubmitting(true);

    try {
      console.log(values);

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-book-wrapper">
      {submitting && (
        <LoadingOverlay title="Processing your book..." />
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <FileDropzone
                    value={value}
                    onChange={onChange}
                    icon={Upload}
                    placeholder="Click to upload PDF"
                    hint="PDF file (max 50MB)"
                    accept=".pdf"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cover"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <FileDropzone
                    value={value}
                    onChange={onChange}
                    icon={ImageIcon}
                    placeholder="Click to upload cover image"
                    hint="Leave empty to auto-generate from PDF"
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Title
                </FormLabel>

                <FormControl>
                  <Input
                    className="form-input"
                    placeholder="ex: Rich Dad Poor Dad"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Author Name
                </FormLabel>

                <FormControl>
                  <Input
                    className="form-input"
                    placeholder="ex: Robert Kiyosaki"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voiceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Choose Assistant Voice
                </FormLabel>

                <FormControl>
                  <VoiceSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="form-btn"
          >
            Begin Synthesis
          </button>
        </form>
      </Form>
    </div>
  );
};

interface FileDropzoneProps {
  value: File | undefined;
  onChange: (file: File | undefined) => void;
  icon: ElementType;
  placeholder: string;
  hint: string;
  accept: string;
}

const FileDropzone = ({
  value,
  onChange,
  icon: Icon,
  placeholder,
  hint,
  accept,
}: FileDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      onChange(file);
    }

    e.target.value = "";
  };

  const handleRemove = (
    e: MouseEvent
  ) => {
    e.stopPropagation();

    onChange(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`upload-dropzone border-2 border-dashed border-[var(--border-medium)]
      ${value ? "upload-dropzone-uploaded" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="flex items-center gap-3 px-4">
          <span className="upload-dropzone-text truncate max-w-[250px]">
            {value.name}
          </span>

          <button
            type="button"
            onClick={handleRemove}
            className="upload-dropzone-remove"
          >
            <X className="size-5" />
          </button>
        </div>
      ) : (
        <>
          <Icon className="upload-dropzone-icon" />

          <span className="upload-dropzone-text">
            {placeholder}
          </span>

          <span className="upload-dropzone-hint">
            {hint}
          </span>
        </>
      )}
    </div>
  );
};

interface VoiceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const VoiceSelector = ({
  value,
  onChange,
}: VoiceSelectorProps) => {
  const maleVoices =
    voiceCategories.male.map(
      (key) => voiceOptions[key]
    );

  const femaleVoices =
    voiceCategories.female.map(
      (key) => voiceOptions[key]
    );

  const renderVoiceGroup = (
    title: string,
    voices: typeof maleVoices
  ) => (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-wide">
        {title}
      </p>

      <div className="voice-selector-options flex-wrap">
        {voices.map((voice) => {
          const selected =
            value === voice.id;

          return (
            <button
              key={voice.id}
              type="button"
              onClick={() =>
                onChange(voice.id)
              }
              className={`voice-selector-option ${
                selected
                  ? "voice-selector-option-selected"
                  : "voice-selector-option-default"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold">
                  {voice.name}
                </span>

                <span className="text-xs text-center">
                  {voice.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {renderVoiceGroup(
        "Male Voices",
        maleVoices
      )}

      {renderVoiceGroup(
        "Female Voices",
        femaleVoices
      )}
    </div>
  );
};

export default UploadForm;