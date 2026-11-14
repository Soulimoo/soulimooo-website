
/**
 * ==========================================
 * SOULIMOO - OFFICIAL WEBSITE
 * Main JavaScript
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------
    // 1. Dynamic copyright year
    // ----------------------------------------

    const footer = document.querySelector(".footer p");

    if (footer) {
        footer.textContent = footer.textContent.replace(
            /©\s*\d{4}/,
            `© ${new Date().getFullYear()}`
        );
    }


    // ----------------------------------------
    // 2. Active navigation links
    // ----------------------------------------

    const navigationLinks = document.querySelectorAll(
        ".navigation a"
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navigationLinks.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        if (isActive) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }

                    });

                });

            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });
    }


    // ----------------------------------------
    // 3. KICK outbound click tracking
    // ----------------------------------------

    const kickLinks = document.querySelectorAll(
        'a[href*="kick.com/soulimooo"]'
    );

    kickLinks.forEach((link) => {

        link.addEventListener("click", () => {

            // Google Analytics integration will be
            // activated when GA4 is configured.

            if (typeof window.gtag === "function") {

                window.gtag("event", "kick_outbound_click", {
                    event_category: "engagement",
                    event_label: link.textContent.trim(),
                    transport_type: "beacon"
                });

            }

        });

    });


    // ----------------------------------------
    // 4. Accessibility: external links
    // ----------------------------------------

    document.querySelectorAll('a[target="_blank"]')
        .forEach((link) => {

            link.rel = "noopener noreferrer";

        });


    // ----------------------------------------
    // 5. Website initialization
    // ----------------------------------------

    console.info(
        "Soulimoo website initialized successfully 🇲🇦"
    );

});
