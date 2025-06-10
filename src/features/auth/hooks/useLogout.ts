import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { logoutApi } from '@/features/auth/api/logoutApi';
import { useRouter } from 'next/navigation';

export function useLogout() {
    const logoutState = useAuthStore((s) => s.logout);
    const router = useRouter();

    const logout = async () => {
        try {
            await logoutApi();
        } catch{


        } finally {
            logoutState();
            router.push('/');
        }
    };

    return { logout };
}