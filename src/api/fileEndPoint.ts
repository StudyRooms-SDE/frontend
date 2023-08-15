import httpClient from '@/api/httpClient';
import type { FileResponse } from '@/models/fileResponse';

const fileEndPoint = {
  getFiles: (sessionId: string) => httpClient.get<FileResponse[]>(`/sessions/${sessionId}/files`),

  uploadFile: (sessionId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return httpClient.post<void>(`/sessions/${sessionId}/files/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteFile: (sessionId: string, fileId: string) =>
    httpClient.delete<void>(`/sessions/${sessionId}/files/${fileId}`),
};

export default fileEndPoint;
