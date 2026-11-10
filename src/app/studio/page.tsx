'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TypeLab from '../../components/TypeLab';
const Studio = dynamic(() => import('../../components/Studio'), { ssr: false, loading: () => <div className="studio-loading">Opening studio<span>✳</span></div> });
export default function StudioPage() { const router = useRouter(); const [typeLab, setTypeLab] = useState(false); return <><Studio onTutorial={() => router.push('/tutorial')} onTypeLab={() => setTypeLab(true)} />{typeLab && <TypeLab onClose={() => setTypeLab(false)} />}</>; }
