'use client'

import { Search, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

type SearchForm = {
  search: string
}

export default function NavSearch() {
  const [searchOpen, setSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchForm>()

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [searchOpen])

  const searchHandler: SubmitHandler<SearchForm> = (data) => {
    if (!data.search.trim()) {
      toast.error('لطفاً عبارت جستجو را وارد کنید')
      return
    }

    toast.success(`در حال جستجوی "${data.search.trim()}" ...`)
    reset()
    setSearchOpen(false)
  }

  // بستن با کلید Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
        reset()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [searchOpen, reset])

  return (
    <>
      <button
        onClick={() => setSearchOpen((prev) => !prev)}
        className="rounded-2xl bg-neutral_normal p-3 transition hover:bg-neutral_light"
        aria-label="جستجو"
      >
        <Search />
      </button>

      {searchOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => {
              setSearchOpen(false)
              reset()
            }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in"
          />

          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-200">
            <div className="rounded-2xl bg-bg p-6 shadow-2xl">
              <form onSubmit={handleSubmit(searchHandler)} className="space-y-4">
                <div className="flex items-center gap-2 rounded-2xl border-2 p-2 px-4 focus-within:border-primary">
                  <input
                    {...register('search', {
                      required: 'لطفاً عبارت جستجو را وارد کنید',
                      minLength: {
                        value: 2,
                        message: 'حداقل ۲ کاراکتر وارد کنید',
                      },
                    })}
                    type="search"
                    placeholder="نام محصول را وارد کنید..."
                    className="flex-1 bg-transparent py-2 px-3 outline-none"
                    ref={(e) => {
                      register('search').ref(e)
                      inputRef.current = e
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSearchOpen(false)
                        reset()
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="rounded-full p-2 transition hover:bg-neutral-100"
                    aria-label="جستجو"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>

                {errors.search && (
                  <p className="text-sm text-red-500 px-3">
                    {errors.search.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false)
                    reset()
                  }}
                  className="absolute top-3 right-3 rounded-full p-1 transition hover:bg-neutral-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
