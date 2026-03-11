import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import BentoFeatures from "@/components/BentoFeatures";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="relative">
            <Navbar />
            <Hero />

            <About />
            <Stats />
            <div className="bg-industrial-dark py-10">
                <BentoFeatures />
            </div>

            <Services />
            <Footer />
        </main>
    );
}