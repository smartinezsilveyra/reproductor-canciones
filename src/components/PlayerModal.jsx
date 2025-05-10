import Modal from 'react-modal';

Modal.setAppElement('#root');

function PlayerModal({ isOpen, onClose, videoUrl }) {
    const getVideoId = (url) => {
        const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
      };

  const videoId = getVideoId(videoUrl);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Video">
      <div>
      <button onClick={onClose}>Cerrar</button>
        {videoId ? (
          <lite-youtube
            videoid={videoId}
            style={{ width: '100%', height: '240px', display: 'block' }}
          ></lite-youtube>
        ) : (
          <p>Error al cargar video.</p>
        )}
      </div>
    </Modal>
  );
}

export default PlayerModal;