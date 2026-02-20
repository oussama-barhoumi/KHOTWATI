import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineChatBubbleLeftRight,
  HiCheck,
  HiOutlineViewfinderCircle,
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
  HiOutlineChatBubbleBottomCenter,
  HiOutlineUser,
  HiPlus,
  HiOutlineCpuChip,
  HiXMark,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineCodeBracket,
  HiOutlineArrowPath,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { FiSunrise } from 'react-icons/fi';
import { LuDumbbell } from 'react-icons/lu';
import { MdSelfImprovement } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';

export function IconHeart({ className = 'w-5 h-5', filled = false }) {
  const Icon = filled ? HiHeart : HiOutlineHeart;
  return <Icon className={className} />;
}

export function IconComment({ className = 'w-5 h-5' }) {
  return <HiOutlineChatBubbleLeftRight className={className} />;
}

export function IconCheck({ className = 'w-5 h-5' }) {
  return <HiCheck className={className} />;
}

export function IconToken({ className = 'w-5 h-5' }) {
  return <FaCoins className={className} />;
}

export function IconTarget({ className = 'w-5 h-5' }) {
  return <HiOutlineViewfinderCircle className={className} />;
}

export function IconHandshake({ className = 'w-5 h-5' }) {
  return <HiOutlineUserGroup className={className} />;
}

export function IconFeed({ className = 'w-5 h-5' }) {
  return <HiOutlineSquares2X2 className={className} />;
}

export function IconUsers({ className = 'w-5 h-5' }) {
  return <HiOutlineUserGroup className={className} />;
}

export function IconChat({ className = 'w-5 h-5' }) {
  return <HiOutlineChatBubbleBottomCenter className={className} />;
}

export function IconUser({ className = 'w-5 h-5' }) {
  return <HiOutlineUser className={className} />;
}

export function IconPlus({ className = 'w-5 h-5' }) {
  return <HiPlus className={className} />;
}

export function IconRobot({ className = 'w-5 h-5' }) {
  return <HiOutlineCpuChip className={className} />;
}

export function IconClose({ className = 'w-5 h-5' }) {
  return <HiXMark className={className} />;
}

export function IconSun({ className = 'w-5 h-5' }) {
  return <HiOutlineSun className={className} />;
}

export function IconMoon({ className = 'w-5 h-5' }) {
  return <HiOutlineMoon className={className} />;
}

export function IconSunrise({ className = 'w-5 h-5' }) {
  return <FiSunrise className={className} />;
}

export function IconDumbbell({ className = 'w-5 h-5' }) {
  return <LuDumbbell className={className} />;
}

export function IconCode({ className = 'w-5 h-5' }) {
  return <HiOutlineCodeBracket className={className} />;
}

export function IconSpinner({ className = 'w-5 h-5' }) {
  return <HiOutlineArrowPath className={`animate-spin ${className}`} />;
}

export function IconMeditate({ className = 'w-5 h-5' }) {
  return <MdSelfImprovement className={className} />;
}

export function IconPencil({ className = 'w-5 h-5' }) {
  return <HiOutlinePencilSquare className={className} />;
}

export function IconTrash({ className = 'w-5 h-5' }) {
  return <HiOutlineTrash className={className} />;
}
