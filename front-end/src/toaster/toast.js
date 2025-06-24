import React from 'react';
import { toast } from 'react-toastify';

export default function ConfirmDeleteToast({ studentName, onConfirm, onCancel }) {
  return (
    <div>
      <p>Do you want to delete <strong>{studentName}</strong> Details?</p>
      <div className="d-flex justify-content-end gap-2 mt-2">
        <button className="btn btn-sm btn-danger" onClick={onConfirm}>Delete</button>
        <button className="btn btn-sm btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
