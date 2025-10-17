import React, { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Adjust path if needed
import "./UploadDocument.css";

const documentTypes = [
  "Lecture Slides",
  "Assignment",
  "Exam Paper",
  "Notes",
  "Other"
];
const courses = [
  "English 101",
  "Physics 201",
  "Mathematics 305",
  "History 202",
  "Computer Science 410"
];

const UploadDocument: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [course, setCourse] = useState("");
  const [docType, setDocType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setDone(false);
      setDownloadURL(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDone(false);
      setDownloadURL(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setDone(false);
    setDownloadURL(null);

    try {
      const storageRef = ref(storage, `faculty-uploads/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        // Optionally, use snapshot for progress.
        undefined,
        (error) => {
          setUploading(false);
          alert("Upload failed: " + error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUploading(false);
            setDone(true);
            setDownloadURL(url);
          });
        }
      );
    } catch (e: any) {
      setUploading(false);
      alert("Upload failed: " + e.message);
    }
  };

  return (
    <div className="upload-bg">
      <div className="upload-panel glassy">
        <div className="upload-title">
          <span role="img" aria-label="upload" className="upload-icon">📤</span> Upload Document
        </div>

        <form
          className="upload-form"
          onSubmit={e => {
            e.preventDefault();
            handleUpload();
          }}
        >
          <div
            className={`drop-zone ${file ? "selected" : ""}`}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="drop-content">
              {!file ? (
                <span>Drag &amp; drop or <span className="choose-file">choose a file</span></span>
              ) : (
                <span className="file-name">{file.name}</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf,.docx,.pptx,.xlsx,.txt,.jpg,.png"
            />
          </div>
          <div className="form-fields">
            <div className="field">
              <label>Course:</label>
              <select required value={course} onChange={e => setCourse(e.target.value)}>
                <option value="">Select Course</option>
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Document Type:</label>
              <select required value={docType} onChange={e => setDocType(e.target.value)}>
                <option value="">Select Type</option>
                {documentTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button
            className="upload-btn"
            disabled={uploading || !file || !course || !docType}
            type="submit"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {done &&
            <div className="upload-success animate-pop">
              ✅ Uploaded successfully!
              {downloadURL && (
                <div style={{ marginTop: '10px', wordBreak: 'break-all', fontSize: '0.95rem' }}>
                  <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                    View Uploaded Document
                  </a>
                </div>
              )}
            </div>
          }
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;
