import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./UploadDocument_students.css";

const documentTypes = [
  "Marksheet",
  "Certificate",
  "Leave Form",
  "Other"
];

const UploadDocumentStudents: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState(documentTypes[0]);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccessMsg("");
      setErrorMsg("");
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!file) {
      setErrorMsg("Please select a file.");
      setUploading(false);
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `student_uploads/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percent);
        },
        (error) => {
          setErrorMsg(error.message);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const db = getFirestore();
          await addDoc(collection(db, "student_documents"), {
            title: title || file.name,
            type: docType,
            url: downloadURL,
            uploadedAt: new Date().toISOString()
          });
          setSuccessMsg("Document uploaded successfully!");
          setFile(null);
          setTitle("");
          setProgress(0);
          setUploading(false);
        }
      );
    } catch (err: any) {
      setErrorMsg(err.message);
      setUploading(false);
    }
  };

  return (
    <div className="upload-student-bg">
      <div className="upload-student-card">
        <div className="upload-student-title">Upload Document</div>
        <form className="upload-form" onSubmit={handleUpload}>
          <label className="upload-student-label">
            Document Title
            <input
              className="upload-student-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              disabled={uploading}
              required
            />
          </label>
          <label className="upload-student-label">
            Document Type
            <select
              className="upload-student-select"
              value={docType}
              onChange={e => setDocType(e.target.value)}
              disabled={uploading}
            >
              {documentTypes.map((type) => (
                <option value={type} key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="upload-student-label">
            Choose File
            <input
              className="upload-student-file"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
              disabled={uploading}
              required
            />
          </label>
          {uploading && (
            <div className="upload-student-progress">
              <div
                className="upload-student-progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <button
            className="upload-student-btn"
            type="submit"
            disabled={uploading || !file}
          >
            {uploading ? `Uploading (${Math.round(progress)}%)...` : "Upload"}
          </button>
        </form>
        {successMsg && <div className="success-msg">{successMsg}</div>}
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
      </div>
    </div>
  );
};

export default UploadDocumentStudents;
