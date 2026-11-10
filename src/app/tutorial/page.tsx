'use client';
import { useRouter } from 'next/navigation';
import Tutorial from '../../components/Tutorial';
export default function TutorialPage() { const router = useRouter(); return <Tutorial onLaunch={() => router.push('/studio')} onBack={() => router.push('/')} />; }
