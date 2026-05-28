import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl">UTSAVAM<span className="text-gold">.</span></div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            A house of celebrations — venue, events and cultural ceremonies, curated with quiet elegance.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/venues" className="hover:text-gold">Venues</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/book" className="hover:text-gold">Book a Date</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> Kerala, India</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-gold" /> +91 00000 00000</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-gold" /> hello@utsavam.in</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Follow</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="p-2 border border-border hover:border-gold hover:text-gold transition-colors"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook" className="p-2 border border-border hover:border-gold hover:text-gold transition-colors"><Facebook size={16} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} UTSAVAM. All rights reserved.
      </div>
    </footer>
  );
}
