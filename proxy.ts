import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. حدد المسارات التي تريدها أن تكون "عامة" (لا تحتاج تسجيل دخول)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/' // أضف هذا إذا كنت تريد أن يرى الناس الصفحة الرئيسية بدون تسجيل دخول
]);
export default clerkMiddleware(async (auth, request) => {
  // 2. إذا كان المسار ليس عاماً، اطلب حمايته (تسجيل دخول)
  if (!isPublicRoute(request)) {
    await auth.protect(); // تم إضافة await هنا
  }
});
export const config = {
  matcher: [
    // هذا الجزء يبقى كما هو (لتحديد الملفات التي يراقبها الـ middleware)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};