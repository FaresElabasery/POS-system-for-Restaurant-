'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger
} from "@/components/ui/sheet";
import { ChevronDown, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';



export default function Navbar() {
    const [position, setPosition] = useState("bottom")
    const [isOpenNav, setisOpenNav] = useState(false)
    const { data: session } = useSession();

    const pathname = usePathname()
    console.log(pathname);

    const handleCloseMenu = () => {
        setisOpenNav(false)
    }
    const handleLogout = async () => {
        try {
            await signOut({ redirect: false })
            toast.success('Logout success')
            location.href = 'login'
        } catch (error) {
            console.log(error);
            toast.error('Logout failed')
        }
    }
    const userLinks = [
        { title: 'Tables', link: '/table' },
    ]
    const adminLinks = [
        { title: 'Tables', link: '/table' },
        { title: 'Products', link: '/products' },
        { title: 'Category', link: '/category' },
        { title: 'Orders', link: '/orders' },
    ]
    return (
        <header className={`z-30 text-black bg-transparent  w-full sticky top-0  backdrop-blur-2xl border-b`}>
            <div className='container'>
                <div className='flex items-center justify-between h-15'>
                    {/* Brand */}
                    <div className='flex items-center gap-4'>
                        <Link href={'/table'} className='flex items-center gap-2'>
                            <span className='sr-only'>POS System</span>
                            <div className='text-2xl font-bold flex items-center gap-2'>
                                <h1 >POS System</h1>
                            </div>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='hidden md:flex' asChild>
                                <Button variant="outline">karam elsham smoha</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>main account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuRadioItem value="top">karam elsham mandra</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bottom">karam elsham moharambeh</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <nav className='hidden md:flex items-center gap-8 w-1/3'>
                        {session &&
                            <>
                                {session?.user?.role === 'admin' ? adminLinks.map(({ title, link }, i) =>
                                    <Link className={`text-sm navbarLink ${pathname === link ? 'active' : ''} decoration-gray-400 dark:decoration-white `} href={link} key={i}>{title}</Link>
                                ) : userLinks.map(({ title, link }, i) =>
                                    <Link className={`text-sm navbarLink ${pathname === link ? 'active' : ''} decoration-gray-400 dark:decoration-white `} href={link} key={i}>{title}</Link>
                                )}
                            </>
                        }
                    </nav>

                    {/* actions btns in desktop */}
                    <div className='flex items-center -ms-10 md:-ms-0'>
                        {session && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className='md:flex items-center gap-2 hidden md:w-full bg-gray-50 rounded-2xl'>
                                        <Avatar className='size-10 '>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <h2 className='font-semibold text-sm hidden md:block'>{session?.user?.role === 'admin' ? 'Admin' : ''} {session?.user?.name}</h2>
                                        <ChevronDown className='hidden md:block' size={25} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-54">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='md:hidden'>{session.user?.role === 'admin' ? 'Admin' : ''} {session?.user?.name}</DropdownMenuLabel>
                                    <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={handleLogout} className='bg-red-500 font-bold capitalize text-white hover:!bg-red-600 hover:!text-white cursor-pointer'>logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    {/* mobile menu */}
                    <div className='flex md:hidden'>
                        {session &&
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className='flex items-center gap-2 md:hidden bg-gray-50 rounded-2xl'>
                                        <Avatar className='size-10 '>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <h2 className='font-semibold text-sm hidden md:block'>{session?.user?.role === 'admin' ? 'Admin' : ''} {session?.user?.name}</h2>
                                        <ChevronDown className='hidden md:block' size={25} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-54">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='md:hidden'>{session?.user?.role === 'admin' ? 'Admin' : ''} {session?.user?.name}</DropdownMenuLabel>
                                    <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={handleLogout} className='bg-red-500 font-bold capitalize text-white hover:!bg-red-600 hover:!text-white cursor-pointer'>logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                        <Sheet open={isOpenNav} onOpenChange={setisOpenNav}>
                            <SheetTrigger asChild>
                                <Button variant={'ghost'} className='md:hidden p-2 rounded-md'>
                                    <Menu className=' size-7' />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side='left'>
                                <SheetHeader>
                                    <Link href={'/table'} className='flex items-center gap-2'>
                                        <span className='sr-only'> POS System</span>
                                        <h1 className='text-lg font-semibold'> POS System</h1>
                                    </Link>
                                </SheetHeader>
                                <nav className='flex flex-col items-center gap-6  '>
                                    {session &&
                                        <>
                                            {session?.user?.role === 'admin' ? adminLinks.map(({ title, link }, i) =>
                                                <Link className={`text-sm navbarLink ${pathname === link ? 'active' : ''} decoration-gray-400 dark:decoration-white `} href={link} key={i}>{title}</Link>
                                            ) : userLinks.map(({ title, link }, i) =>
                                                <Link className={`text-sm navbarLink ${pathname === link ? 'active' : ''} decoration-gray-400 dark:decoration-white `} href={link} key={i}>{title}</Link>
                                            )}
                                        </>
                                    }
                                </nav>
                                <SheetFooter>
                                    <Button asChild onClick={handleCloseMenu} className=' capitalize text-text bg-button ms-2 hover:text-text2 border-1'>
                                        <Link href="/login">signIn</Link>
                                    </Button>
                                    <SheetClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header >
    )
}

