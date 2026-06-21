// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                const email = this.querySelector('input[type="email"]').value;
                this.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="fas fa-check-circle me-2"></i>
                        <strong>Success!</strong> Thank you for subscribing with ${email}. You'll receive our next newsletter in your inbox.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            this.querySelectorAll('input, textarea').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
                errorDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Please fill in all required fields.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                this.appendChild(errorDiv);
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                this.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="fas fa-check-circle me-2"></i>
                        <strong>Thank you, ${name}!</strong> Your message has been sent successfully. 
                        We'll get back to you at ${email} within 24 hours.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
            }, 2000);
        });
    }
    
    // Search functionality
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchModal = document.createElement('div');
            searchModal.innerHTML = `
                <div class="modal fade" id="searchModal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Search Books</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="input-group">
                                    <input type="text" class="form-control form-control-lg" id="searchInput" placeholder="Search by title, author, or genre...">
                                    <button class="btn btn-primary btn-lg" id="searchButton">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                                <div class="search-suggestions mt-3">
                                    <small class="text-muted">Popular searches:</small>
                                    <div class="d-flex flex-wrap gap-2 mt-2">
                                        <a href="#" class="badge bg-light text-dark search-tag">Fiction</a>
                                        <a href="#" class="badge bg-light text-dark search-tag">Biography</a>
                                        <a href="#" class="badge bg-light text-dark search-tag">Science</a>
                                        <a href="#" class="badge bg-light text-dark search-tag">Romance</a>
                                        <a href="#" class="badge bg-light text-dark search-tag">Business</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(searchModal);
            const modal = new bootstrap.Modal(document.getElementById('searchModal'));
            modal.show();
            
            // Add search functionality
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const searchTags = document.querySelectorAll('.search-tag');
            
            if (searchButton) {
                searchButton.addEventListener('click', function() {
                    const query = searchInput.value.trim();
                    if (query) {
                        alert(`Searching for: "${query}"\n\n(Search functionality would connect to a backend in a real application)`);
                        modal.hide();
                    }
                });
            }
            
            if (searchInput) {
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const query = searchInput.value.trim();
                        if (query) {
                            alert(`Searching for: "${query}"\n\n(Search functionality would connect to a backend in a real application)`);
                            modal.hide();
                        }
                    }
                });
            }
            
            searchTags.forEach(tag => {
                tag.addEventListener('click', function(e) {
                    e.preventDefault();
                    searchInput.value = this.textContent;
                });
            });
            
            searchModal.addEventListener('hidden.bs.modal', function() {
                searchModal.remove();
            });
        });
    }
    
    // Animate counter numbers
    function animateCounter() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const countTo = parseFloat(counter.getAttribute('data-count'));
            let countNum = 0;
            const duration = 2000;
            const step = duration / 100;
            
            const timer = setInterval(() => {
                countNum += countTo / 100;
                if (countNum >= countTo) {
                    countNum = countTo;
                    clearInterval(timer);
                }
                
                let displayNum;
                if (countTo % 1 === 0) {
                    displayNum = Math.floor(countNum);
                } else {
                    displayNum = countNum.toFixed(1);
                }
                
                counter.textContent = displayNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }, step);
        });
    }
    
    // Load ebooks data
    function loadEbooks() {
        const ebooks = [
            {
                id: 1,
                title: "The Midnight Library",
                author: "Matt Haig",
                category: "Fiction",
                price: 12.99,
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "A novel about all the choices that go into a life well lived."
            },
            {
                id: 2,
                title: "Atomic Habits",
                author: "James Clear",
                category: "Self-Help",
                price: 14.99,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "An easy & proven way to build good habits & break bad ones."
            },
            {
                id: 3,
                title: "Project Hail Mary",
                author: "Andy Weir",
                category: "Science Fiction",
                price: 13.99,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "A lone astronaut must save the earth from disaster in this high-stakes thriller."
            },
            {
                id: 4,
                title: "The Silent Patient",
                author: "Alex Michaelides",
                category: "Thriller",
                price: 11.99,
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "A psychological thriller about a woman who shoots her husband and then stops speaking."
            }
        ];
        
        const ebooksContainer = document.getElementById('ebooks-container');
        if (ebooksContainer) {
            const ebooksHTML = ebooks.map(ebook => `
                <div class="col-md-3 col-sm-6">
                    <div class="ebook-card">
                        <img src="${ebook.image}" alt="${ebook.title}" class="ebook-image">
                        <div class="card-body">
                            <span class="ebook-category">${ebook.category}</span>
                            <h5 class="ebook-title">${ebook.title}</h5>
                            <p class="ebook-author">by ${ebook.author}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="ebook-rating">
                                    ${'★'.repeat(Math.floor(ebook.rating))}${'☆'.repeat(5 - Math.floor(ebook.rating))}
                                    <small class="text-muted ms-1">(${ebook.rating})</small>
                                </div>
                                <div>
                                    <span class="ebook-price">$${ebook.price}</span>
                                </div>
                            </div>
                            <p class="ebook-description text-muted small mt-2">${ebook.description}</p>
                            <div class="d-grid gap-2 mt-3">
                                <button class="btn btn-sm btn-primary add-to-cart" data-id="${ebook.id}">
                                    <i class="fas fa-cart-plus me-2"></i> Add to Cart
                                </button>
                                <button class="btn btn-sm btn-outline-secondary preview-btn" data-id="${ebook.id}">
                                    <i class="fas fa-eye me-2"></i> Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            ebooksContainer.innerHTML = ebooksHTML;
            
            // Add event listeners to Add to Cart buttons
            ebooksContainer.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const bookId = parseInt(this.getAttribute('data-id'));
                    addToCart(bookId);
                    // Add click animation
                    this.innerHTML = '<i class="fas fa-check me-2"></i> Added!';
                    this.classList.remove('btn-primary');
                    this.classList.add('btn-success');
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-cart-plus me-2"></i> Add to Cart';
                        this.classList.remove('btn-success');
                        this.classList.add('btn-primary');
                    }, 1500);
                });
            });
            
            // Add event listeners to Preview buttons
            ebooksContainer.querySelectorAll('.preview-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const bookId = parseInt(this.getAttribute('data-id'));
                    const book = ebooks.find(b => b.id === bookId);
                    if (book) {
                        alert(`Preview of "${book.title}" by ${book.author}\n\n${book.description}\n\nPrice: $${book.price}`);
                    }
                });
            });
        }
    }
    
    // Load reviews data
    function loadReviews() {
        const reviews = [
            {
                name: "Sarah Johnson",
                date: "2 days ago",
                rating: 5,
                text: "BookNook has completely transformed my reading experience. The selection is amazing and the reading interface is seamless.",
                avatar: "https://randomuser.me/api/portraits/women/32.jpg"
            },
            {
                name: "Michael Chen",
                date: "1 week ago",
                rating: 4,
                text: "As an avid reader, I appreciate the curated collections. The recommendations are spot on and I've discovered so many new favorites.",
                avatar: "https://randomuser.me/api/portraits/men/54.jpg"
            },
            {
                name: "Emma Davis",
                date: "3 weeks ago",
                rating: 5,
                text: "The customer service is exceptional! They helped me recover my library when I switched devices. Highly recommended!",
                avatar: "https://randomuser.me/api/portraits/women/67.jpg"
            }
        ];
        
        const reviewsContainer = document.getElementById('reviews-container');
        if (reviewsContainer) {
            const reviewsHTML = reviews.map(review => `
                <div class="col-md-4">
                    <div class="review-card">
                        <div class="review-header">
                            <img src="${review.avatar}" alt="${review.name}" class="review-avatar">
                            <div class="review-info">
                                <h5>${review.name}</h5>
                                <span class="review-date">${review.date}</span>
                            </div>
                        </div>
                        <div class="review-rating">
                            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                        </div>
                        <p class="review-text">"${review.text}"</p>
                    </div>
                </div>
            `).join('');
            
            reviewsContainer.innerHTML = reviewsHTML;
        }
    }
    
    // Load FAQ data
    function loadFAQ() {
        const faqs = [
            {
                question: "How do I purchase ebooks?",
                answer: "Simply browse our collection, click on any ebook you like, and click 'Add to Cart'. Proceed to checkout where you can securely pay using various payment methods."
            },
            {
                question: "What devices can I read on?",
                answer: "Our ebooks are compatible with all major devices including smartphones, tablets, e-readers, and computers. You can also read directly in your web browser."
            },
            {
                question: "Can I return an ebook?",
                answer: "Yes, we offer a 30-day return policy for all ebooks. If you're not satisfied with your purchase, you can request a refund within 30 days of purchase."
            },
            {
                question: "How do I access my purchased ebooks?",
                answer: "After purchase, your ebooks will be available in your personal library. You can access them anytime by logging into your account on any device."
            },
            {
                question: "Are there any subscription plans?",
                answer: "Yes, we offer monthly and annual subscription plans that give you unlimited access to our entire ebook collection. Check our pricing page for details."
            }
        ];
        
        const faqAccordion = document.getElementById('faqAccordion');
        if (faqAccordion) {
            const faqHTML = faqs.map((faq, index) => `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="faqHeading${index}">
                        <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse${index}">
                            ${faq.question}
                        </button>
                    </h2>
                    <div id="faqCollapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            ${faq.answer}
                        </div>
                    </div>
                </div>
            `).join('');
            
            faqAccordion.innerHTML = faqHTML;
        }
    }
    
    // Load events data
    function loadEvents() {
        const events = [
            {
                title: "Virtual Author Meetup",
                date: { day: "15", month: "MAR" },
                time: "6:00 PM EST",
                location: "Online",
                description: "Join bestselling authors for an interactive Q&A session about their latest works.",
                link: "#"
            },
            {
                title: "Book Club Discussion",
                date: { day: "22", month: "MAR" },
                time: "7:30 PM EST",
                location: "Online",
                description: "Monthly book club discussion of 'The Midnight Library' by Matt Haig.",
                link: "#"
            },
            {
                title: "Writing Workshop",
                date: { day: "05", month: "APR" },
                time: "2:00 PM EST",
                location: "Online",
                description: "Learn writing techniques from published authors in this interactive workshop.",
                link: "#"
            }
        ];
        
        const eventsContainer = document.getElementById('events-container');
        if (eventsContainer) {
            const eventsHTML = events.map(event => `
                <div class="col-md-4">
                    <div class="event-card">
                        <div class="event-date">
                            <span class="event-day">${event.date.day}</span>
                            <span class="event-month">${event.date.month}</span>
                        </div>
                        <div class="card-body">
                            <h5 class="event-title">${event.title}</h5>
                            <p class="event-time">
                                <i class="fas fa-clock me-2"></i> ${event.time}
                            </p>
                            <p class="event-location">
                                <i class="fas fa-map-marker-alt me-2"></i> ${event.location}
                            </p>
                            <p class="card-text">${event.description}</p>
                            <a href="${event.link}" class="btn btn-primary btn-sm register-btn">Register Now</a>
                        </div>
                    </div>
                </div>
            `).join('');
            
            eventsContainer.innerHTML = eventsHTML;
            
            // Add click effects to register buttons
            eventsContainer.querySelectorAll('.register-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const eventTitle = this.closest('.event-card').querySelector('.event-title').textContent;
                    alert(`Registration for "${eventTitle}"\n\n(Registration functionality would connect to a backend in a real application)`);
                });
            });
        }
    }
    
    // Initialize all data
    loadEbooks();
    loadReviews();
    loadFAQ();
    loadEvents();
    
    // Animate counters when in viewport
    function checkCounterVisibility() {
        const element = document.querySelector('.stats-section');
        if (isElementInViewport(element)) {
            animateCounter();
            window.removeEventListener('scroll', checkCounterVisibility);
        }
    }
    
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', checkCounterVisibility);
    checkCounterVisibility(); // Check on page load
    
    // View Cart button functionality
    const viewCartBtn = document.querySelector('.view-cart-btn');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.getCount() === 0) {
                alert('Your cart is empty! Add some books first.');
            } else {
                alert(`Proceeding to checkout with ${cart.getCount()} item(s)\n\nTotal: $${cart.getTotal().toFixed(2)}\n\n(Checkout functionality would connect to a payment gateway in a real application)`);
            }
        });
    }
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading animation to page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});