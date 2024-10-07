"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { BarChart2, Send, Lock, FileText, Rocket, Shield, Users, Copy } from "lucide-react"
import MoneyRain from './MoneyRain'

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export default function LandingUI() {
  const [contractAddress, setContractAddress] = useState("Contract address will be available here when live")
  const [copied, setCopied] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', updateCursorPosition)

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let source: AudioBufferSourceNode | null = null;

    fetch('/audio/your-background-music.mp3')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.loop = true;
        source.start();
      })
      .catch(error => console.error('Error:', error));

    return () => {
      if (source) {
        source.stop();
      }
      audioContext.close();
    };
  }, []);

  const handleExternalLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(contractAddress).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const updateContractAddress = () => {
    setContractAddress("0x1234567890123456789012345678901234567890") // Example address
  }

  const xUrl = "https://x.com/MAGA6900"
  const telegramUrl = "https://t.me/MAGA6900"
  const dexScreenerUrl = "https://dexscreener.com/ethereum/M69TokenAddress"
  const emailAddress = "team@maga6900.live"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-white to-red-900 text-red-500 overflow-hidden relative cursor-none">
      <MoneyRain />
      
      <div 
        className="fixed pointer-events-none z-[100]"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Image
          src="/elon.png"
          alt="Elon Musk Cursor"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[100px] lg:max-w-[150px] hidden md:block"
        />
      </div>
      
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <Image
          src="/don.png"
          alt="Donald Trump"
          width={525}
          height={525}
          className="opacity-50 w-full h-auto object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-6 md:py-12 relative z-20 max-w-7xl">
        <header className="text-center mb-6 md:mb-8 relative">
          <div className="absolute inset-0 bg-blue-950 opacity-50 blur-xl z-0"></div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-2 md:mb-3 animate-pulse font-foldit font-weight-900 text-red-500">
              MAGA-6900
            </h1>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-red-400 font-foldit font-weight-800 mt-2 md:mt-4">
              M69
            </p>
          </div>
        </header>

        <div className="bg-blue-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl p-4 mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-base md:text-lg text-red-300 font-sans font-bold mb-2 md:mb-0">Contract Address:</p>
          <div className="flex items-center bg-blue-900 rounded-full px-4 py-2 w-full md:w-auto">
            <p className="text-xs md:text-sm text-red-300 mr-2 font-sans truncate max-w-[200px] md:max-w-none">{contractAddress}</p>
            <button
              onClick={copyToClipboard}
              className="text-red-300 hover:text-red-100 transition-colors duration-300 flex-shrink-0"
              title="Copy to clipboard"
            >
              <Copy size={20} />
            </button>
          </div>
          {copied && <span className="text-green-400 ml-2 mt-2 md:mt-0 font-sans">Copied!</span>}
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => handleExternalLink(dexScreenerUrl)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 flex items-center font-sans font-bold text-sm md:text-base"
              >
                <BarChart2 className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Chart
              </button>
              <button 
                onClick={() => handleExternalLink(telegramUrl)}
                className="bg-white hover:bg-gray-200 text-red-600 py-2 md:py-3 px-4 md:px-6 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 flex items-center font-sans font-bold text-sm md:text-base"
              >
                <Send className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Telegram
              </button>
              <button 
                onClick={() => handleExternalLink(xUrl)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 flex items-center font-sans font-bold text-sm md:text-base"
              >
                X
              </button>
            </div>
            <div className="bg-blue-950 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl md:text-2xl mb-4 text-red-400 font-foldit font-weight-700">Why MAGA-6900?</h3>
              <p className="text-base md:text-xl mb-4 text-red-300 font-sans">
                MAGA-6900 embodies the spirit of innovation and boldness in the crypto world. 
                We're here to shake things up and bring back the excitement to the market!
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-red-400 mr-3" />
                  <span className="font-sans text-sm md:text-base text-red-300">Community-Driven Project</span>
                </div>
                <div className="flex items-center">
                  <Rocket className="h-5 w-5 md:h-6 md:w-6 text-red-400 mr-3" />
                  <span className="font-sans text-sm md:text-base text-red-300">Ambitious Roadmap for Growth</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-950 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-2xl md:text-4xl mb-6 text-red-400 font-foldit font-weight-800">Tokenomics</h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-red-400 mr-4" />
                <div>
                  <h3 className="text-lg md:text-2xl text-red-300 font-foldit font-weight-700">0/0 Taxes</h3>
                  <p className="text-sm md:text-base text-red-300 font-sans">No hidden fees, just pure gains</p>
                </div>
              </div>
              <div className="flex items-center">
                <Lock className="h-6 w-6 md:h-8 md:w-8 text-red-400 mr-4" />
                <div>
                  <h3 className="text-lg md:text-2xl text-red-300 font-foldit font-weight-700">CA Locked for 30 Days</h3>
                  <p className="text-sm md:text-base text-red-300 font-sans">Your investment, secured</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-red-400 mr-4" />
                <div>
                  <h3 className="text-lg md:text-2xl text-red-300 font-foldit font-weight-700">Veteran Team</h3>
                  <p className="text-sm md:text-base text-red-300 font-sans">Experienced professionals at the helm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <button
            onClick={updateContractAddress}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 font-sans font-bold text-sm md:text-base"
          >
            Update Contract Address
          </button>
        </div>

        <footer className="mt-8 md:mt-16 text-center">
          <p className="text-base md:text-lg font-sans font-bold text-red-300">Join the movement: <a href={`mailto:${emailAddress}`} className="underline hover:text-red-100 transition-colors duration-300">{emailAddress}</a></p>
          <p className="text-xs md:text-sm mt-2 md:mt-4 text-red-300 font-sans">
            Disclaimer: Investing in any asset carries risk. Please invest responsibly and only what you can afford to lose. Contact us at {emailAddress} for more information.
          </p>
        </footer>
      </div>
    </div>
  )
}