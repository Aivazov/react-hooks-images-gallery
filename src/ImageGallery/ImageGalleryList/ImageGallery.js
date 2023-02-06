import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';

export default function ImageGalleryList({ items, modal }) {
  return (
    <ul className="gallery">
      {items?.map((item) => (
        <ImageGalleryItem key={item.id} item={item} showModal={modal} />
      ))}
    </ul>
  );
}
