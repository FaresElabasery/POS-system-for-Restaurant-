import AuthImage from '@images/auth.jpg'
import Image from 'next/image'
import LoginForm from './LoginForm'

export default function page() {
    return (
        <div className="login page">
            <div className="container">
                <div className="content flex items-center justify-between gap-10">
                    <div className="w-2/3 hidden md:block image">
                        <Image className='' alt='auth image' src={AuthImage} />
                    </div>
                    <div className="w-full md:w-1/3 form">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
