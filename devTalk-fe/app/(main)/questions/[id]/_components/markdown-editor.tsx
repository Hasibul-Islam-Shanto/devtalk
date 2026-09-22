'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted flex h-44 items-center justify-center rounded-md border">
        <p className="text-muted-foreground">Loading preview...</p>
      </div>
    ),
  },
);

const MarkDownEditor = ({ value }: { value: string }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div data-color-mode={resolvedTheme === 'light' ? 'light' : 'dark'}>
      <MDEditorMarkdown
        source={value}
        style={{ whiteSpace: 'pre-wrap', background: 'transparent' }}
      />
    </div>
  );
};

export default MarkDownEditor;
