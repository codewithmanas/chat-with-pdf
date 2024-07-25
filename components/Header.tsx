import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { FilePlus2 } from 'lucide-react'

const Header = () => {
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b">
      <Link
        href='/dashboard'
        className="text-2xl font-inter"
      >
        Chat to <span className="text-amber-600">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant="link" className="hidden md:flex">
                <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline">
                <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button asChild variant="outline" className="border-amber-600">
                <Link href="/dashboard/upload">
                  <FilePlus2 className="text-amber-600" />
                </Link>
          </Button>

          {/* Upgrade Button */}
          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}

export default Header