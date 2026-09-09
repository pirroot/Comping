'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function NavCategories() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const categories = [
    { id: 1, name: 'الکترونیک', link: '/category/electronics' },
    { id: 2, name: 'مد و پوشاک', link: '/category/fashion' },
    { id: 3, name: 'کتاب و محصولات فرهنگی', link: '/category/books' },
    { id: 4, name: 'خانه و آشپزخانه', link: '/category/home' },
    { id: 5, name: 'ورزشی', link: '/category/sports' },
  ]

  return (
    <li className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${isOpen
          ? 'bg-primary text-white'
          : 'hover:bg-primary hover:text-primary_light '
          }`}
        aria-expanded={isOpen}
      >
        دسته‌بندی
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-5 w-56 origin-top-right overflow-hidden rounded-2xl bg-bg shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 ${isOpen
          ? 'scale-100 opacity-100'
          : 'pointer-events-none scale-5 opacity-0'
          }`}
      >
        <ul className="py-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={cat.link}
                className="block px-4 py-2.5 text-sm  text-text transition-colors hover:bg-primary rounded-2xl m-2 hover:text-primary_light"
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
