import Image from "./Image.jsx";

export default function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'rounded-2xl object-cover h-full';
    }
    return (
        <Image className={className} src={place.photos[index]} alt="" />
    );
}