<template>
  <div class="min-h-screen bg-eerie-black font-poppins text-white">
    <!-- Sidebar Component -->
    <Sidebar 
      :is-open="isSidebarOpen"
      :current-section="currentSection"
      class="fixed top-0 left-0 h-full z-20 transition-all duration-300"
      :class="{
        'translate-x-0 w-64 sm:w-72 md:w-80': isSidebarOpen, 
        '-translate-x-full': !isSidebarOpen, 
        'md:translate-x-0': true
      }"
    />

    <!-- Main Content -->
    <main class="transition-all duration-300 p-6 md:p-8" :class="[isSidebarOpen ? 'md:ml-80' : 'ml-0']">
    <!-- Navigation -->
    <nav class="mb-8">
      <!-- Desktop Navigation -->
      <ul class="hidden md:flex gap-4 flex-wrap">
        <li v-for="section in sections" :key="section">
          <button 
            @click="currentSection = section"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="currentSection === section ? 'bg-orange-yellow text-white' : 'text-gray-400 hover:text-white'"
          >
            {{ section }}
          </button>
        </li>
      </ul>
      
      <!-- Mobile Navigation -->
      <div class="md:hidden">
        <select 
          v-model="currentSection" 
          class="w-full p-2 bg-jet text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-yellow text-base"
        >
            <option v-for="section in sections" :key="section" :value="section" class="text-sm">
            {{ section }}
            </option>
        </select>
      </div>
    </nav>

      <!-- Content Sections -->
      <TransitionGroup name="fade" mode="out-in">
        <!-- About Section -->
        <section v-if="currentSection === 'About'" key="about" class="space-y-8">
          <h2 class="text-3xl font-semibold">About Me</h2>
          <p class="text-gray-300 leading-relaxed">
            I’m an undergraduate pursuing a degree in Computer Science – AI, complemented by specialized coursework in Data Science and Artificial Intelligence. My academic journey gives me a theoretical grounding in cloud computing, machine learning, and software development, while my hands-on projects have challenged me to apply that knowledge in real-world scenarios.
          </p>
          <p class="text-gray-300 leading-relaxed">
            Here you can explore my world, from an none fancy IT Developer to a person that have great passion in seeking knowledge by exploring new technologies and world insight about AI and related domain when applying up-to-date technologies into it.
          </p>

          <div>
            <h3 class="text-2xl font-semibold mb-4">Fields of Interest</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="field in fields" :key="field.title" 
                class="p-6 bg-gradient-jet rounded-lg">
                <h4 class="text-xl font-medium text-orange-yellow">{{ field.title }}</h4>
                <p class="mt-2 text-gray-300">{{ field.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Resume Section -->
        <section v-if="currentSection === 'Resume'" key="resume" class="space-y-8">
          <h2 class="text-3xl font-semibold">Resume</h2>
          
          <!-- Education -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold">Education</h3>
            <div class="space-y-4">
              <div v-for="edu in education" :key="edu.degree" class="p-6 bg-gradient-jet rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-xl font-medium text-orange-yellow">{{ edu.degree }}</h4>
                    <p class="text-gray-300">{{ edu.school }}</p>
                  </div>
                  <span class="text-sm text-gray-400">{{ edu.year }}</span>
                </div>
                <p class="mt-2 text-gray-300">{{ edu.description }}</p>
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold">Experience</h3>
            <div class="space-y-4">
              <div v-for="exp in experience" :key="exp.title" class="p-6 bg-gradient-jet rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-xl font-medium text-orange-yellow">{{ exp.title }}</h4>
                    <p class="text-gray-300">{{ exp.company }}</p>
                  </div>
                  <span class="text-sm text-gray-400">{{ exp.period }}</span>
                </div>
                <p class="mt-2 text-gray-300">{{ exp.description }}</p>
              </div>
            </div>
          </div>

          <!-- Skills -->
            <div class="space-y-6">
            <h3 class="text-2xl font-semibold">Skills</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="skill in skills" :key="skill.name" class="p-4 bg-gradient-jet rounded-lg flex items-center">
              <img 
                :src="skill.icon" 
                :alt="`${skill.name} icon`" 
                class="w-10 h-10 mr-3"
                @error="(e) => e.target.src = 'https://via.placeholder.com/40'"
              />
              <div class="flex-1">
                <h4 class="text-lg font-medium text-white">{{ skill.name }}</h4>
              </div>
              </div>
            </div>
            </div>
        </section>

        <!-- Certfication -->
        <section v-if="currentSection === 'Resume'" id="certifications" class="space-y-6">
          <h3 class="text-2xl font-semibold pt-6">Certifications</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="cert in certifications" :key="cert.id" class="p-6 bg-gradient-jet rounded-lg">
              <h3 class="text-xl font-medium text-orange-yellow">{{ cert.name }}</h3>
              <p class="text-gray-300">{{ cert.issuer }}</p>
              <p class="text-gray-400">{{ cert.date }}</p>
              <a 
                :href="cert.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-block mt-4 px-4 py-2 bg-orange-yellow text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                View Certificate
              </a>
            </div>
          </div>
        </section>

        <!-- Portfolio Section -->
        <section v-if="currentSection === 'Portfolio'" key="portfolio" class="space-y-8">
          <h2 class="text-3xl font-semibold">Portfolio</h2>
          
          <!-- Filter -->
          <div class="flex gap-4 flex-wrap">
            <button
              v-for="category in ['All', ...projectCategories]"
              :key="category"
              @click="selectedCategory = category"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="selectedCategory === category ? 'bg-orange-yellow text-white' : 'bg-jet text-gray-400 hover:text-white'"
            >
              {{ category }}
            </button>
          </div>

          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="project in filteredProjects"
              :key="project.title"
              class="group relative overflow-hidden rounded-lg"
            >
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                v-bind="$attrs"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 class="text-xl font-medium text-white">{{ project.title }}</h4>
                <p class="text-gray-300 mt-2">{{ project.description }}</p>
                <div class="flex gap-4 mt-4">
                  <a 
                    :href="project.demo" 
                    class="px-4 py-2 bg-orange-yellow text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Demo
                  </a>
                  <a 
                    :href="project.github" 
                    class="px-4 py-2 bg-jet text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Section -->
        <section v-if="currentSection === 'Blog'" key="blog" class="space-y-8">
          <h2 class="text-3xl font-semibold">Blog</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article 
              v-for="post in blogPosts" 
              :key="post.title"
              class="bg-gradient-jet rounded-lg overflow-hidden group"
            >
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                v-bind="$attrs"
                @error="handleImageError"
              />
              <div class="p-6">
                <div class="flex gap-4 text-sm text-gray-400 mb-2">
                  <span>{{ post.date }}</span>
                  <span>{{ post.category }}</span>
                </div>
                <h3 class="text-xl font-medium text-white group-hover:text-orange-yellow transition-colors">
                  {{ post.title }}
                </h3>
                <p class="mt-2 text-gray-300">{{ post.excerpt }}</p>
                <a 
                  href="#" 
                  class="inline-block mt-4 text-orange-yellow hover:text-white transition-colors"
                >
                  Read More →
                </a>
              </div>
            </article>
          </div>
        </section>

        <!-- Contact Section -->
        <section v-if="currentSection === 'Contact'" key="contact" class="space-y-8">
          <h2 class="text-3xl font-semibold">Contact</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Contact Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  id="name"
                  v-model="contactForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-jet rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-yellow"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  id="email"
                  v-model="contactForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 bg-jet rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-yellow"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  v-model="contactForm.message"
                  required
                  rows="4"
                  class="w-full px-4 py-2 bg-jet rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-yellow"
                ></textarea>
              </div>
              
              <button
                type="submit"
                class="w-full px-6 py-3 bg-orange-yellow text-white rounded-lg hover:bg-orange-600 transition-colors"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
              
              <!-- Form Notifications -->
              <div v-if="submitStatus" class="mt-4">
                <div v-if="submitStatus === 'success'" 
                    class="p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-400">
                  <p>Message sent successfully! I will get back to you as soon as possible.</p>
                </div>
                <div v-if="submitStatus === 'error'" 
                    class="p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400">
                  <p>{{ errorMessage || 'There was an error sending your message. Please try again.' }}</p>
                </div>
              </div>
            </form>

            <!-- Map -->
            <div class="h-96 bg-jet rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62708.14387673113!2d106.58612376222044!3d10.79146507555257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bf733e69175%3A0xd8d63453733325fe!2sT%C3%A2n%20Ph%C3%BA%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1741602034108!5m2!1sen!2s"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </TransitionGroup>
    </main>

    <!-- Mobile Menu Button -->
    <button 
      @click="isSidebarOpen = !isSidebarOpen"
      class="fixed bottom-4 right-4 md:hidden bg-orange-yellow p-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
    >
      <IconMenu class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(window ? window.innerWidth > 768 : true)
const currentSection = ref('About')
const selectedCategory = ref('All')

const sections = ['About', 'Resume', 'Portfolio', 'Blog', 'Contact']

const fields = [
  {
    title: 'Machine Learning',
    description: 'Currently exploring various ML algorithms and their applications, eager to apply this knowledge in a real-world industry.'
  },
  {
    title: 'Cloud Computing',
    description: 'Learning about cloud platforms like AWS, excited to work with cloud technologies in a professional setting to deploy the best practise model pipline.'
  },
  {
    title: 'Deep Learning',
    description: 'Diving into neural networks and deep learning architectures, keen to contribute to innovative projects as an intern.'
  },
  {
    title: 'Data Engineering',
    description: 'Understanding data pipelines and processing systems, looking forward to gaining hands-on experience in data engineering during an internship.'
  }
]

const education = [
  {
    degree: 'Bachelor of Computer Science, Majoring in Artificial Intelligence',
    school: 'Swinburne University of Technology',
    year: '2022-2026',
    description: 'Mastered AI fundamentals at Swinburne Vietnam, delivering impactful solutions in collaboration with industry partners.'
  }
]

const experience = [
  {
    title: 'Member of AIO 2024',
    company: 'AI Vietnam',
    period: '2024-2025',
    description: 'Intensive 1-year program with diverse projects in image processing, natural language processing, and data science, showcasing practical skills from python, algorithms, machine learning, and real-world project applications.'
  }
]

const skills = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Python-Light.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/AWS-Light.svg' },
  { name: 'Anaconda', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Anaconda-Light.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Docker.svg' },
  { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Flask-Light.svg' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Django.svg' },
  { name: 'Github', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Github-Light.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Git.svg' },
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Jenkins-Light.svg' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Kubernetes.svg' },
  { name: 'LaTeX', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/LaTeX-Light.svg' },
  { name: 'Stack Overflow', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/StackOverflow-Light.svg' },
  { name: 'LinkedIn', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/LinkedIn.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Linux-Light.svg' },
  { name: 'Nuxt', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/NuxtJS-Light.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Vite-Light.svg' },
  { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/VueJS-Light.svg' },
  { name: 'Obsidian', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Obsidian-Light.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/TensorFlow-Light.svg' },
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Terraform-Light.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/TypeScript.svg' },
  { name: 'Ubuntu', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/Ubuntu-Light.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/VSCode-Light.svg' },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/TailwindCSS-Light.svg' }
]

const certifications = [
  {
    id: 1,
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco',
    date: 'April 2024',
    link: 'https://www.credly.com/badges/ea475619-7376-44f1-9bba-162b836b9c48'
  },
  {
    id: 2,
    name: 'Programming for Everybody (Getting Started with Python)',
    issuer: 'University of Michigan',
    date: 'October 2024',
    link: 'https://coursera.org/share/5ee62f4961be5e83b3d118d4ef28e6a6'
  },
  {
    id: 3,
    name: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'October 2024',
    link: 'https://www.credly.com/badges/988c98b4-6507-4e49-b2d2-6093db2310fa'
  },
  {
    id: 4,
    name: 'Getting Started with Data Analytics on AWS',
    issuer: 'Amazon Web Services',
    date: 'December 2024',
    link: 'https://coursera.org/share/d50e9b9c27fafd6c418db51ff6c888f9'
  }
]

const projects = [
  {
    title: 'AI Image Recognition',
    description: 'Deep learning model for real-time object detection',
    image: 'https://via.placeholder.com/400x300',
    category: 'Research & Publications',
    demo: '#',
    github: '#'
  },
  {
    title: 'Cloud ML Pipeline',
    description: 'Automated ML training and deployment pipeline',
    image: 'https://via.placeholder.com/400x300',
    category: 'Cloud Computing',
    demo: '#',
    github: '#'
  },
  {
    title: 'NLP Chatbot',
    description: 'Advanced chatbot using transformer models',
    image: 'https://via.placeholder.com/400x300',
    category: 'Deep Learning',
    demo: '#',
    github: '#'
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for data analytics',
    image: 'https://via.placeholder.com/400x300',
    category: 'Data Engineering',
    demo: '#',
    github: '#'
  },
  {
    title: 'AI Image Recognition',
    description: 'Deep learning model for real-time object detection',
    image: 'https://via.placeholder.com/400x300',
    category: 'Talks & Workshops',
    demo: '#',
    github: '#'
  },
  {
    title: 'AI Image Recognition',
    description: 'Deep learning model for real-time object detection',
    image: 'https://via.placeholder.com/400x300',
    category: 'Machine Learning Operations',
    demo: '#',
    github: '#'
  },
  {
    title: 'Cloud ML Pipeline',
    description: 'Automated ML training and deployment pipeline',
    image: 'https://via.placeholder.com/400x300',
    category: 'Machine Learning',
    demo: '#',
    github: '#'
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for data analytics',
    image: 'https://via.placeholder.com/400x300',
    category: 'Data Analytics',
    demo: '#',
    github: '#'
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for data analytics',
    image: 'https://via.placeholder.com/400x300',
    category: 'Data Science',
    demo: '#',
    github: '#'
  }
]

const projectCategories = [...new Set(projects.map(p => p.category))]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects
  return projects.filter(p => p.category === selectedCategory.value)
})

const blogPosts = [
  {
    title: 'The Future of Machine Learning',
    excerpt: 'Exploring upcoming trends in ML and their impact on industry.',
    image: 'https://via.placeholder.com/400x300',
    date: 'March 15, 2024',
    category: 'Machine Learning'
  },
  {
    title: 'Building Scalable ML Systems',
    excerpt: 'Best practices for developing production-ready ML systems.',
    image: 'https://via.placeholder.com/400x300',
    date: 'March 1, 2024',
    category: 'MLOps'
  },
  {
    title: 'Deep Learning Breakthroughs',
    excerpt: 'Recent advances in deep learning architectures and applications.',
    image: 'https://via.placeholder.com/400x300',
    date: 'February 15, 2024',
    category: 'Deep Learning'
  },
  {
    title: 'Cloud Computing for AI',
    excerpt: 'Leveraging cloud platforms for scalable AI solutions.',
    image: 'https://via.placeholder.com/400x300',
    date: 'February 1, 2024',
    category: 'Cloud'
  }
]

const contactForm = reactive({
  name: '',
  email: '',
  message: ''
})

// Add form submission states
const isSubmitting = ref(false)
const submitStatus = ref(null)
const errorMessage = ref('')

const sendSubmission = async (accessKey, recipient) => {
  // Prepare form data
  const formData = new FormData()
  formData.append('name', contactForm.name)
  formData.append('email', contactForm.email)
  formData.append('message', contactForm.message)
  formData.append('access_key', accessKey) // Use provided access key for this submission
  formData.append('recipient', recipient)  // Set the recipient for this submission

  // Convert form data to JSON
  const object = Object.fromEntries(formData.entries())
  const json = JSON.stringify(object)

  // Send the form data
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })

  return await response.json()
}

const handleSubmit = async (event) => {
  event.preventDefault()
  
  // Reset status and show submitting state
  submitStatus.value = null
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    // First submission with the first access key and recipient
    const result1 = await sendSubmission(
      'df577497-d8d8-47e3-9351-94d21a61e207', 
      'lhtthong.forwork@outlook.com'
    )
    console.log("Form submitted successfully to first recipient:", result1)

    // Second submission with the second access key and recipient
    const result2 = await sendSubmission(
      'b18db079-0457-4a29-91ac-ef55ae2200cb', 
      'lhtthong.forwork@gmail.com'
    )
    console.log("Form submitted successfully to second recipient:", result2)
    
    // Show success message
    submitStatus.value = 'success'
    
    // Reset form
    contactForm.name = ""
    contactForm.email = ""
    contactForm.message = ""
    
  } catch (error) {
    console.error("Error submitting form:", error)
    // Show error message
    submitStatus.value = 'error'
    errorMessage.value = error.message || 'Failed to send message'
  } finally {
    isSubmitting.value = false
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  }
}

// Add window resize listener to adjust sidebar state
onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      isSidebarOpen.value = false
    } else {
      isSidebarOpen.value = true
    }
  })
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>