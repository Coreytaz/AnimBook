export { default } from 'next-auth/middleware'
// import { withAuth } from 'next-auth/middleware'
// import { NextResponse } from 'next/server'

// export default withAuth(
//     function middleware(req) {
//         console.log('token: ', req.nextauth.token)

//         if (req.nextUrl.pathname.startsWith('/profile') && req.nextauth.token?.token.length! < 0)
//             return NextResponse.rewrite(new URL('/auth?message=You Are Not Authorized!', req.url))
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => !!token,
//         },
//     }
// )

// export const config = {
//     matcher: ['/profile/'],
// }
