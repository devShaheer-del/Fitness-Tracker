import React from 'react'

const TestimonialSection = () => {
    return (
        <>

            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="fw-bold text-primary mb-5">What Our Users Say</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <blockquote className="blockquote">
                                <p className="mb-4 fst-italic">"This app helped me lose 12kg and stay consistent every single day!"</p>
                                <footer className="blockquote-footer">Sarah, <cite title="Source Title">Fitness Enthusiast</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default TestimonialSection