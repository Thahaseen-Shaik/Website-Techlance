import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--footer-bg)', color: '#fff', paddingTop: '100px', paddingBottom: '50px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '60px', marginBottom: '80px' }} className="grid-footer">
                    <div>
                        <div style={{ background: '#fff', padding: '16px 18px', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <div style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 900,
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.15rem'
                            }}>
                                T
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                                <span style={{ color: 'var(--secondary)', fontWeight: 900, letterSpacing: '0.12em', fontSize: '0.95rem' }}>TECHLANCE</span>
                                <span style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.18em', fontSize: '0.72rem' }}>SOLUTIONS</span>
                            </div>
                        </div>
                        <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: '30px', maxWidth: '350px' }}>
                            Bridging innovation and trade with expert IT solutions and global reach. Headquartered in Muscat, Oman.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            {[
                                { icon: Facebook, url: '#' },
                                { icon: Linkedin, url: 'https://www.linkedin.com/company/techlance-international/' },
                                { icon: Twitter, url: '#' },
                                { icon: Instagram, url: '#' }
                            ].map((item, i) => {
                                const IconComponent = item.icon;

                                return (
                                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ 
                                    background: 'rgba(255,255,255,0.1)', 
                                    width: '40px', 
                                    height: '40px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    borderRadius: '12px',
                                    transition: '0.3s',
                                    color: '#fff'
                                    }} onMouseEnter={(e) => e.target.style.background = 'var(--accent)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}>
                                    <IconComponent size={20} />
                                </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '30px', color: 'var(--accent)', fontWeight: '700' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            {Object.entries({
                                'Home': '/',
                                'About Us': '/about',
                                'Services': '/services',
                                'Careers': '/careers',
                                'Latest Job Openings': '/latest-openings',
                                'Contact': '/contact'
                            }).map(([label, path]) => (
                                <Link key={label} to={path} style={{ color: '#fff', opacity: 0.8, transition: '0.3s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.8}>{label}</Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '30px', color: 'var(--accent)', fontWeight: '700' }}>Services</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <Link to="/services/cloud" style={{ color: '#fff', opacity: 0.8 }}>Cloud Solutions</Link>
                            <Link to="/services/enterprise" style={{ color: '#fff', opacity: 0.8 }}>Enterprise MGMT</Link>
                            <Link to="/services/ai" style={{ color: '#fff', opacity: 0.8 }}>Data & AI</Link>
                            <Link to="/logistics" style={{ color: '#fff', opacity: 0.8 }}>Logistics MGMT</Link>
                            <Link to="/export" style={{ color: '#fff', opacity: 0.8 }}>Export MGMT</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '30px', color: 'var(--accent)', fontWeight: '700' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <Mail size={22} color="var(--accent)" />
                                <div>
                                    <span style={{ opacity: 0.9, display: 'block' }}>info@techlance.com</span>
                                    <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>proc@techlance.com (Sales)</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <Phone size={22} color="var(--accent)" />
                                <span style={{ opacity: 0.9 }}>+968 1234 5678</span>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <MapPin size={22} color="var(--accent)" style={{ marginTop: '5px' }} />
                                <div>
                                    <span style={{ opacity: 0.9, display: 'block' }}>Muscat, Sultanate of Oman</span>
                                    <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>Odessa Missouri, United States</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ 
                    borderTop: '1px solid rgba(255,255,255,0.1)', 
                    paddingTop: '30px', 
                    textAlign: 'center', 
                    opacity: 0.6,
                    fontSize: '0.95rem'
                }}>
                    <p>© 2025 Techlance Solutions. All rights reserved.</p>
                    <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <Link to="/privacy" style={{ color: '#fff' }}>Privacy Policy</Link>
                        <Link to="/terms" style={{ color: '#fff' }}>Terms & Conditions</Link>
                        <a href="#" style={{ color: '#fff' }}>Company Profile</a>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 992px) {
                    .grid-footer { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
                }
                @media (max-width: 576px) {
                    .grid-footer { grid-template-columns: 1fr !important; text-align: center; }
                    .grid-footer div { align-items: center; display: flex; flex-direction: column; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;

