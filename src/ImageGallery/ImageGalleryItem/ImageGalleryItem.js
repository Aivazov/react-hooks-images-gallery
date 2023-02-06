export const ImageGalleryItem = ({ item, showModal }) => {
  return (
    <li onClick={() => showModal(item)}>
      <img src={item.webformatURL} width="240" alt="..." />
    </li>
  );
};
