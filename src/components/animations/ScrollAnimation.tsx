import { motion } from 'framer-motion';
import React from 'react';

type AnimationVariant =
    | 'fadeIn'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight'
    | 'scale'
    | 'rotate'
    | 'flip'
    | 'bounce'
    | 'elastic'
    | 'stagger';

interface ScrollAnimationProps {
    children: React.ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    className?: string;
    threshold?: number;
    staggerChildren?: number;
}

const variants = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    },
    slideUp: {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    },
    slideLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    },
    slideRight: {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    },
    rotate: {
        hidden: { opacity: 0, rotate: -180, scale: 0.8 },
        visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 30
            }
        }
    },
    flip: {
        hidden: { opacity: 0, rotateX: -180 },
        visible: {
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25
            }
        }
    },
    bounce: {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    },
    elastic: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 15
            }
        }
    },
    stagger: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2
            }
        }
    }
};

export default function ScrollAnimation({
    children,
    variant = 'fadeIn',
    delay = 0,
    duration = 0.5,
    className = '',
    threshold = 0.1,
    staggerChildren
}: ScrollAnimationProps) {
    const baseTransition = {
        duration,
        delay,
        ease: "easeOut"
    };

    const getTransition = () => {
        if (variant === 'stagger' && staggerChildren) {
            return {
                ...baseTransition,
                staggerChildren
            };
        }
        return baseTransition;
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px", amount: threshold }}
            variants={variants[variant]}
            transition={getTransition()}
            className={className}
        >
            {children}
        </motion.div>
    );
} 