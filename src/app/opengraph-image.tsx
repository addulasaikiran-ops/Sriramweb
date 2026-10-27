import { ImageResponse } from "next/og";
export const alt = "Sriram Travels — car rentals and travel enquiries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px",background:"#111b2b",color:"#f5f3ee",fontFamily:"sans-serif"}}><div style={{fontSize:24,letterSpacing:8,color:"#c9a96e"}}>TRAVELS & TOWING SERVICES</div><div style={{fontSize:82,fontWeight:700,marginTop:35}}>SRIRAM TRAVELS</div><div style={{fontSize:34,marginTop:25,color:"#e2c995"}}>Your journey, our responsibility.</div><div style={{fontSize:23,marginTop:42,color:"#d4dbe4"}}>Gooty · Andhra Pradesh</div></div>,size); }
