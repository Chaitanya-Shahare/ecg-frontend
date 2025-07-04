import React from "react";
import { motion } from "framer-motion";
import { TeamMember } from "../types";

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Dhruv Sharma",
      role: "Machine Learning",
      image: "../../assets/dhruv.jpeg",
    },
    {
      name: "Chaitanya Shahare",
      role: "Frontend Developer",
      image: "../../assets/chaitanya.jpeg",
    },
    {
      name: "Anurag Verma",
      role: "Backend Developer",
      image: "../../assets/anurag.jpeg",
    },
    {
      name: "Himanshu Bisht",
      role: "Frontend Developer",
      image: "../../assets/himanshu.jpeg",
    },
  ];

  const supervisor: TeamMember = {
    name: "Dr. M. Hanief",
    role: "Project Supervisor",
    image: "../../assets/dr-m-hanief.png",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Meet Our Team
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Our dedicated team of healthcare professionals and technology experts
          working to advance heart health monitoring
        </p>
      </motion.div>

      {/* Supervisor */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-16"
      >
        <motion.div
          whileHover={{ y: -10, scale: 1.05 }}
          className="text-center group"
        >
          <div className="relative mb-4">
            <img
              src={supervisor.image}
              alt={supervisor.name}
              className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {supervisor.name}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            {supervisor.role}
          </p>
        </motion.div>
      </motion.div>

      {/* Team Members */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
            className="text-center group"
          >
            <div className="relative mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {member.name}
            </h3>
            <p className="text-green-600 dark:text-green-400 font-medium">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

