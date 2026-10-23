'use client'
import { Card } from '@heroui/react'
import { BookOpen, Heart, Bookmark, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import SignInForm from './form/sign-in/ui'
import SignUpForm from './form/sign-up/ui'
export default function AuthPage() {
    const [currentForm, setCurrentForm] = useState<'signIn' | 'signUp'>('signIn')
    return (
        <section className="auth-page">
            <Link href="/catalog" className="auth-back">
                <ArrowLeft size={16} /> Вернуться к историям
            </Link>
            <Card className="auth-card">
                <aside className="auth-story">
                    <span className="auth-story-icon">
                        <BookOpen size={30} />
                    </span>
                    <span className="eyebrow">Ваша личная книжная полка</span>
                    <h2>
                        Любимые истории.
                        <br />
                        Всегда рядом.
                    </h2>
                    <p>
                        Собирайте коллекцию, сохраняйте открытия и возвращайтесь к тому, что
                        вдохновляет.
                    </p>
                    <div className="auth-perks">
                        <span>
                            <Heart size={17} /> Всё любимое в одном месте
                        </span>
                        <span>
                            <Bookmark size={17} /> Ваша история заказов
                        </span>
                    </div>
                    <span className="auth-story-sign">AnimBook · Истории, которые остаются</span>
                </aside>
                <div className="auth-form-panel">
                    {currentForm === 'signIn' ? (
                        <SignInForm onSignIn={() => {}} onChangeForm={setCurrentForm} />
                    ) : (
                        <SignUpForm
                            onSignUp={() => setCurrentForm('signIn')}
                            onChangeForm={setCurrentForm}
                        />
                    )}
                </div>
            </Card>
        </section>
    )
}
