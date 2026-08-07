"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  items,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#17495B] hover:shadow-2xl"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#17495B] to-[#2D728F]">
        <Icon className="text-white" size={30} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900">
        {title}
      </h3>

      <div className="mt-4 h-1 w-12 rounded-full bg-[#17495B]" />

      <p className="mt-5 leading-7 text-gray-600">
        {description}
      </p>

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <Check
              size={18}
              className="text-[#17495B]"
            />

            <span className="text-gray-700">
              {item}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-8 flex items-center gap-2 font-semibold text-[#17495B] transition-all group-hover:gap-4">
        Descubrir servicio

        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}