// app/(default)/layout.tsx
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex-grow pt-20 px-0 sm:px-6">{children}</main>
            <Footer />
            </>
    )
}