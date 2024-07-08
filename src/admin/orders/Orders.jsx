import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [message, setMessage] = useState('');
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    fetchImageList();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('images', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/image/fileSystem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setUploadedFileName(response.data);
        setMessage('File uploaded successfully.');

        // Fetch and display the uploaded image immediately after successful upload
        fetchAndDisplayImage(response.data);

        // Update the image list after successful upload
        fetchImageList();
      } else {
        setMessage(`Error: ${response.data}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const fetchAndDisplayImage = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/image/fileSystem/${fileName}`, {
        responseType: 'blob', // Set responseType to 'blob' for binary data
      });

      const imageUrl = URL.createObjectURL(response.data);

      setImageList(prevImageList => [...prevImageList, { name: fileName, src: imageUrl }]);
    } catch (error) {
      setMessage(`Error fetching image ${fileName}: ${error.message}`);
    }
  };

  const fetchImageList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/image/fileSystem');

      // Populate the image list with name and base64 image data
      const imagePromises = response.data.map(async (fileName) => {
        try {
          const imgResponse = await axios.get(`http://localhost:8080/image/fileSystem/${fileName}`, {
            responseType: 'blob',
          });

          const imageUrl = URL.createObjectURL(imgResponse.data);

          return { name: fileName, src: imageUrl };
        } catch (error) {
          setMessage(`Error fetching image ${fileName}: ${error.message}`);
          return { name: fileName, src: null };
        }
      });

      const imageListData = await Promise.all(imagePromises);
      setImageList(imageListData);
    } catch (error) {
      setMessage(`Error fetching image list: ${error.message}`);
    }
  };

  const handleFetchImage = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/image/fileSystem/${fileName}`, {
        responseType: 'blob',
      });

      const imageUrl = URL.createObjectURL(response.data);

      setImageList(prevImageList => [...prevImageList, { name: fileName, src: imageUrl }]);
    } catch (error) {
      setMessage(`Error fetching image ${fileName}: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      {uploadedFileName && (
        <div>
          <h3>Uploaded File: {uploadedFileName}</h3>
        </div>
      )}
      {imageList.length > 0 && (
        <div>
          <h3>Image List</h3>
          {imageList.map((image, index) => (
            <div key={index}>
              <h4>{image.name}</h4>
              {image.src && <img src={image.src} alt={image.name} style={{ maxWidth: '100%', maxHeight: '300px' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
