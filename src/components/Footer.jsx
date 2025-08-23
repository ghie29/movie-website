export default function Footer() {
    return (
        <footer className="py-6 mt-10 text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} <span className="text-yellow-500 font-bold">MYAVWORLD</span>. All rights reserved.
            </p>
        </footer>
    );
}
