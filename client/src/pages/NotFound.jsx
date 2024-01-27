import React from 'react';

const NotFound = () => {
    return (
        <div>
            <section className="flex items-center h-full p-60">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl text-primary">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">Oops vous vous êtes égaré.</p>
                        <p className="mt-4 mb-8 dark:text-gray-400">Mais ne vous inquiétez pas, vous pouvez trouver bien d’autres choses sur notre page d’accueil.</p>
                        <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold text-white bg-primary rounded-2xl">Retour à l'accueil</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFound;