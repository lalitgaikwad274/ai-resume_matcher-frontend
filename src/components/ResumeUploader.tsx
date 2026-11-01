import { useRef, useState } from 'react';
import { FileText, UploadCloud, X, CheckCircle } from 'lucide-react';

interface Props {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ResumeUploader({
  file,
  onFileSelect,
  error,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateFile = (selectedFile: File) => {
    const extension = selectedFile.name
      .split('.')
      .pop()
      ?.toLowerCase();

    if (!['pdf', 'docx'].includes(extension || '')) {
      setValidationError('Only PDF and DOCX files are supported.');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setValidationError('File size must be 5 MB or less.');
      return;
    }

    if (selectedFile.size === 0) {
      setValidationError('The selected file is empty.');
      return;
    }

    setValidationError('');
    onFileSelect(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
    setValidationError('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="upload-wrapper">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        hidden
        onChange={(event) => {
          const selectedFile = event.target.files?.[0];

          if (selectedFile) {
            validateFile(selectedFile);
          }

          event.target.value = '';
        }}
      />

      {!file ? (
        <div
          className={`upload-dropzone ${dragging ? 'dragging' : ''}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <UploadCloud size={42} />

          <h3>Drop your resume here</h3>

          <p>or click to browse files</p>

          <span>Supported formats: PDF, DOCX · Maximum 5 MB</span>
        </div>
      ) : (
        <div className="selected-file">
          <FileText size={35} />

          <div className="file-info">
            <strong>{file.name}</strong>

            <span>
              {(file.size / 1024).toFixed(1)} KB
            </span>

            <small>
              <CheckCircle size={13} />
              Resume ready for analysis
            </small>
          </div>

          <button
            type="button"
            className="remove-file"
            onClick={removeFile}
            aria-label="Remove resume"
          >
            <X size={19} />
          </button>
        </div>
      )}

      {(validationError || error) && (
        <p className="upload-error">
          {validationError || error}
        </p>
      )}
    </div>
  );
}