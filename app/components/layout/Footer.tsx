import React from "react";

export function Footer() {
    return (
        <footer className="relative bg-[var(--black-primary)] text-[var(--white-primary)] pt-32 pb-12 overflow-hidden">
            {/* Top Curve Separator Logic will go here */}

            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                {/* CTA Zone */}
                <div className="mb-24 text-center">
                    <h2 className="text-4xl md:text-5xl font-light mb-8">
                        This is not another platform.<br />
                        It’s a campus reimagined.
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 rounded-full bg-[var(--white-primary)] text-[var(--black-primary)] font-bold text-lg hover:scale-105 transition-transform">
                            Join as Student
                        </button>
                        <button className="px-8 py-4 rounded-full border border-[var(--gray-border)] text-[var(--white-primary)] font-medium hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-colors">
                            Partner with Us
                        </button>
                    </div>
                </div>

                {/* Links Grid Placeholder */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[var(--gray-border)] pt-12">
                    <div className="text-[var(--gray-body)]">© 2026 Digital Campus</div>
                    {/* More columns */}
                </div>
            </div>
        </footer>
    );
}
