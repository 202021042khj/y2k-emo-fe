import type { FileEntry } from "@/types/love";

/** Glossary styled as a directory listing: file name, what it meant, year. */
export default function FileList({ files }: { files: readonly FileEntry[] }) {
  return (
    <dl className="flex flex-col">
      {files.map((file) => (
        <div
          key={file.name}
          className="grid grid-cols-1 gap-0.5 border-b border-love-paper/18 py-2.5 md:grid-cols-[auto_1fr_auto] md:gap-4 md:py-3"
        >
          <dt className="text-love-cyan">{file.name}</dt>
          <dd className="text-love-paper">{file.description}</dd>
          <dd className="hidden text-love-paper/55 md:block">{file.year}</dd>
        </div>
      ))}
    </dl>
  );
}
