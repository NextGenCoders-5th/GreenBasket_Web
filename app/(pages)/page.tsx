"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Leaf,
  ShoppingCart,
  Star,
  Users,
  Truck,
  Shield,
  Heart,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  CheckCircle,
  Globe,
  Package,
  Sparkles,
  Apple,
  Cherry,
  Grape,
} from "lucide-react"
import { IconCopyright } from "@tabler/icons-react"
import Link from "next/link"

const LandingPage = () => {
  const [email, setEmail] = useState("")

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-100/20 to-orange-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div {...fadeInUp} className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 text-sm font-medium">
                  🌱 Farm Fresh • Locally Sourced • Sustainably Grown
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                    Fresh
                  </span>
                  <br />
                  <span className="text-slate-800">From Farm</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    To Your Table
                  </span>
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  Discover the finest selection of fresh fruits and vegetables from local farmers and trusted vendors.
                  Quality guaranteed, delivered fresh to your doorstep.
                </p>

                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>100% Organic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Same Day Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Best Prices</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={'/marketplace'}
                  className="bg-gradient-to-r rounded-md flex items-center gap-1 from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>

              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">500+</div>
                  <div className="text-sm text-slate-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">10+</div>
                  <div className="text-sm text-slate-600">Local Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">200+</div>
                  <div className="text-sm text-slate-600">Fresh Products</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-orange-400/20 rounded-3xl blur-2xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center">
                        <Apple className="w-16 h-16 text-red-500" />
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center">
                        <Grape className="w-16 h-16 text-accent-500" />
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
                        <Cherry className="w-16 h-16 text-pink-500" />
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                        <Leaf className="w-16 h-16 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-green-200 mb-4">Why Choose GreenBasket</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Experience the
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                {" "}
                Difference
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We connect you directly with local farmers and vendors to bring you the freshest produce at the best
              prices.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Leaf,
                title: "100% Fresh",
                description: "Directly sourced from local farms with guaranteed freshness",
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Same-day delivery to your doorstep with temperature control",
                color: "from-accent-500 to-accent-600",
                bgColor: "from-accent-50 to-accent-100",
              },
              {
                icon: Shield,
                title: "Quality Assured",
                description: "Every product is carefully inspected for quality and safety",
                color: "from-accent-500 to-accent-600",
                bgColor: "from-accent-50 to-accent-100",
              },
              {
                icon: Heart,
                title: "Support Local",
                description: "Help local farmers and vendors grow their business",
                color: "from-red-500 to-red-600",
                bgColor: "from-red-50 to-red-100",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon
                        className={`w-8 h-8 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">Fresh Categories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Explore Our
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {" "}
                Fresh Selection
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From crisp vegetables to juicy fruits, discover the finest produce from our trusted network of local
              vendors.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Fresh Fruits",
                image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60",
                products: "200+ varieties",
                description: "Sweet, juicy, and packed with vitamins",
                badge: "Seasonal",
                color: "from-red-500 to-orange-500",
              },
              {
                name: "Organic Vegetables",
                image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60",
                products: "150+ varieties",
                description: "Crisp, fresh, and pesticide-free",
                badge: "Organic",
                color: "from-green-500 to-green-600",
              },
              {
                name: "Leafy Greens",
                image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60",
                products: "50+ varieties",
                description: "Nutrient-rich and garden fresh",
                badge: "Superfood",
                color: "from-green-600 to-green-700",
              },
              {
                name: "Exotic Fruits",
                image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60",
                products: "75+ varieties",
                description: "Rare and unique flavors from around the world",
                badge: "Premium",
                color: "from-accent-500 to-pink-500",
              },
              {
                name: "Root Vegetables",
                image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60",
                products: "40+ varieties",
                description: "Earthy flavors and essential nutrients",
                badge: "Staple",
                color: "from-orange-500 to-red-500",
              },
              {
                name: "Herbs & Spices",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=60",
                products: "100+ varieties",
                description: "Fresh aromatics for your culinary adventures",
                badge: "Aromatic",
                color: "from-green-500 to-teal-500",
              },
            ].map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className={`bg-gradient-to-r ${category.color} text-white border-0 shadow-lg`}>
                        {category.badge}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90 mb-2">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.products}</span>
                        <Button
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                        >
                          Explore
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vendors Section */}
      <section id="vendors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-accent-100 text-accent-700 border-accent-200 mb-4">Trusted Partners</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Meet Our
              <span className="bg-gradient-to-r from-accent-600 to-accent-600 bg-clip-text text-transparent">
                Amazing Vendors
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our carefully selected network of local farmers and vendors ensures you get the highest quality produce
              every time.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                name: "Green Valley Farms",
                location: "California, USA",
                specialty: "Organic Vegetables",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format&fit=crop&q=60",
                products: "150+ Products",
                badge: "Top Rated",
              },
              {
                name: "Sunshine Orchards",
                location: "Florida, USA",
                specialty: "Citrus Fruits",
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&auto=format&fit=crop&q=60",
                products: "80+ Products",
                badge: "Premium",
              },
              {
                name: "Mountain Fresh Co.",
                location: "Colorado, USA",
                specialty: "Alpine Herbs",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=60",
                products: "60+ Products",
                badge: "Certified",
              },
            ].map((vendor, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={vendor.image || "/placeholder.svg"}
                      alt={vendor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white border-0 shadow-lg">{vendor.badge}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{vendor.name}</h3>
                        <div className="flex items-center gap-1 text-slate-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{vendor.location}</span>
                        </div>
                        <p className="text-sm text-slate-600">{vendor.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{vendor.rating}</span>
                        </div>
                        <p className="text-xs text-slate-500">{vendor.products}</p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                      View Products
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center">
            <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-4">
              <Users className="w-5 h-5 mr-2" />
              Become a Vendor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-accent-100 text-accent-700 border-accent-200 mb-4">Customer Love</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              What Our
              <span className="bg-gradient-to-r from-accent-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Customers Say
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust GreenBasket for their daily fresh produce needs.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Home Chef",
                content:
                  "GreenBasket has completely transformed my cooking! The quality of vegetables is outstanding, and the delivery is always on time. I love supporting local farmers through this platform.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=60",
              },
              {
                name: "Michael Chen",
                role: "Restaurant Owner",
                content:
                  "As a restaurant owner, I need the freshest ingredients daily. GreenBasket's vendor network provides consistent quality and variety that keeps my customers coming back.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
              },
              {
                name: "Emily Rodriguez",
                role: "Nutritionist",
                content:
                  "I recommend GreenBasket to all my clients. The organic selection is impressive, and knowing the source of the produce gives me confidence in recommending it for healthy diets.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Growing Together,
              <br />
              <span className="text-green-200">One Order at a Time</span>
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Our platform continues to grow, connecting more customers with local vendors every day.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} animate="animate" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Happy Customers", icon: Users },
              { number: "500+", label: "Local Vendors", icon: Package },
              { number: "50,000+", label: "Orders Delivered", icon: Truck },
              { number: "25+", label: "Cities Served", icon: Globe },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}


      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">GreenBasket</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Connecting communities with fresh, local produce. Supporting farmers, delighting customers, one delivery
                at a time.
              </p>
              <div className="flex items-center gap-4">
                <Facebook className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Become a Vendor
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Delivery Areas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Fresh Fruits
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Organic Vegetables
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Leafy Greens
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Herbs & Spices
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Seasonal Produce
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span className="text-slate-400">+251 925 52 72 12</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-500" />
                  <span className="text-slate-400">info@greenbarket.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-slate-400">
                    Bahir Dar, St Goerge Street
                    <br />
                    GreebBasket
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
