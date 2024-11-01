// Icon.js
import React from 'react';
// import icons from '../../static/icon';
import { ReactComponent as IconMobile } from '../../static/Icons/Mobile.svg';
import { ReactComponent as IconGaming } from '../../static/Icons/Gaming.svg';
import { ReactComponent as IconComestic } from '../../static/Icons/Comestic.svg';
import { ReactComponent as IconAccessory } from '../../static/Icons/Accessory.svg';
import { ReactComponent as IconCloth } from '../../static/Icons/Cloth.svg';
import { ReactComponent as IconShoe } from '../../static/Icons/Shoe.svg';
import { ReactComponent as IconGift } from '../../static/Icons/Gift.svg';
import { ReactComponent as IconPet } from '../../static/Icons/Pet.svg';
import { ReactComponent as IconOther } from '../../static/Icons/Other.svg';
import { ReactComponent as IconComputer } from '../../static/Icons/Computer.svg';





const icons={
    Mobile: IconMobile,
    Gaming: IconGaming,
    Comestic: IconComestic,
    Accessory: IconAccessory,
    Cloth: IconCloth,
    Shoe: IconShoe,
    Gift: IconGift,
    Pet: IconPet,
    Other: IconOther,
    Computer: IconComputer
}
function Icon({ name, size , color = 'currentColor', ...props }) {
  // Lấy icon từ object dựa trên tên truyền vào
  const SelectedIcon = icons[name];
  
  if (!SelectedIcon) {
    console.warn(`Icon with name "${name}" does not exist.`);
    return null; // Trả về null nếu icon không tồn tại
  }

  // Truyền các props cho icon SVG, bao gồm color và size
  return <SelectedIcon width={size} height={size} fill={color} {...props} />;
}

export default Icon;
