'use client'
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger
} from "@/components/ui/sheet";
import { CarTaxiFront, ChevronDown, Menu, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function Navbar() {
    const [position, setPosition] = useState("bottom")
    const [isOpenNav, setisOpenNav] = useState(false)
    const pathname = usePathname()
    console.log(pathname);

    const handleCloseMenu = () => {
        setisOpenNav(false)
    }
    const navLinks = [
        { title: 'Home', link: '/' },
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
                        <Link href={'/'} className='flex items-center gap-2'>
                            <span className='sr-only'>Spherule</span>
                            <div className='text-2xl font-bold flex items-center gap-2'>
                                <Image src={'logo.svg'} alt='logo' width={25} height={25}></Image>
                                <h1 >Cashier</h1>
                            </div>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">karam elsham smoha</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>main account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuRadioItem value="top">karam elsham mandra</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bottom">karam elsham moharambeh</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <nav className='hidden md:flex items-center gap-8'>
                        {navLinks.map(({ title, link }, i) =>
                            <Link className={`text-sm navbarLink ${pathname === link ? 'active' : ''} decoration-gray-400 dark:decoration-white `} href={link} key={i}>{title}</Link>
                        )}
                    </nav>

                    {/* actions btns in desktop */}
                    <div className='hidden md:flex items-center  gap-4'>
                        <Button asChild className='font-semibold capitalize rounded-full   dark:text-Bg ms-2 hover:text-text2 border-1'>
                            <Link className='font-semibold capitalize' href="/register"><Plus /> <span>New Order</span></Link>
                        </Button>

                        {/* <Link href="/login">Login</Link>
                        <Button asChild className='font-semibold capitalize rounded-full   dark:text-Bg ms-2 hover:text-text2 border-1'>
                            <Link className='font-semibold capitalize' href="/register">Register</Link>
                        </Button> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className='flex items-center gap-2 bg-gray-50 rounded-2xl'>
                                    <Avatar className='size-10'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <h2 className=' font-bold'>Fares elabasery</h2>
                                    <ChevronDown size={15} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-54">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem className='bg-red-500 font-bold capitalize text-white hover:!bg-red-600 hover:!text-white cursor-pointer'>logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    {/* mobile menu */}
                    <Sheet open={isOpenNav} onOpenChange={setisOpenNav}>
                        <SheetTrigger asChild>
                            <Button variant={'ghost'} className='md:hidden p-2 rounded-md'>
                                <Menu className=' size-7' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left'>
                            <SheetHeader>
                                <Link href={'/'} className='flex items-center gap-2'>
                                    <span className='sr-only'> Cashier</span>
                                    <Image src="/logo.svg" alt="logo" width={30} height={30} />
                                    <h1 className='text-lg font-semibold'> Cashier</h1>
                                </Link>
                            </SheetHeader>
                            <nav className='flex flex-col items-center gap-6  '>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className='flex items-center gap-2 bg-gray-50 rounded-2xl'>
                                            <Avatar className='size-10'>
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <h2 className=' font-bold'>Fares elabasery</h2>
                                            <ChevronDown size={15} />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-54">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem className='bg-red-500 font-bold capitalize text-white hover:!bg-red-600 hover:!text-white cursor-pointer'>logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
        </header >
    )
}

