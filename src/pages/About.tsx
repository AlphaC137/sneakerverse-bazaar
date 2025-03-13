
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ImageLazy } from "@/components/ui/image-lazy";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          {/* Hero Section */}
          <section className="mb-16 md:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="animate-slide-in">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-6">
                  Our Story
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                  Crafting Perfection, One Sneaker at a Time
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  At SNEAKVERSE, we are driven by our passion for exceptional design and uncompromising quality. Our journey began with a simple idea: to create sneakers that seamlessly blend artistry, function, and comfort.
                </p>
                <Button asChild>
                  <Link to="/shop">
                    Discover Our Collection
                  </Link>
                </Button>
              </div>
              
              <div className="animate-fade-in">
                <ImageLazy
                  src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1471&auto=format&fit=crop"
                  alt="Our workshop"
                  className="rounded-lg aspect-square object-cover"
                />
              </div>
            </div>
          </section>
          
          {/* Values Section */}
          <section className="py-12 md:py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground">
                These principles guide everything we do, from design to delivery.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
              {[
                {
                  title: "Minimalist Design",
                  description: "We believe in the power of simplicity. Every element of our sneakers has a purpose, with no unnecessary details."
                },
                {
                  title: "Premium Materials",
                  description: "We source only the highest quality materials, ensuring durability, comfort, and a reduced environmental footprint."
                },
                {
                  title: "Artisanal Craftsmanship",
                  description: "Each pair is meticulously crafted by skilled artisans who take pride in their attention to detail and precision."
                }
              ].map((value, index) => (
                <div key={index} className="bg-background border rounded-lg p-6 hover-lift">
                  <h3 className="text-xl font-medium mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          
          <Separator className="my-12" />
          
          {/* Our Process Section */}
          <section className="py-12 md:py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Our Process
              </h2>
              <p className="text-muted-foreground">
                From conception to creation, every step is handled with care and precision.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center animate-fade-in">
              <ImageLazy
                src="https://images.unsplash.com/photo-1519482816300-1490fdf2c2bd?q=80&w=1470&auto=format&fit=crop"
                alt="Design process"
                className="rounded-lg aspect-video object-cover"
              />
              
              <div className="space-y-8">
                {[
                  {
                    number: "01",
                    title: "Design",
                    description: "Our designers sketch concepts that balance aesthetics with functionality, focusing on clean lines and timeless appeal."
                  },
                  {
                    number: "02",
                    title: "Material Selection",
                    description: "We carefully select premium materials that meet our standards for quality, sustainability, and performance."
                  },
                  {
                    number: "03",
                    title: "Crafting",
                    description: "Skilled artisans bring designs to life, with meticulous attention to every stitch, seam, and detail."
                  },
                  {
                    number: "04",
                    title: "Quality Control",
                    description: "Each pair undergoes rigorous testing to ensure they meet our high standards for comfort, durability, and appearance."
                  }
                ].map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-medium">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          <section className="py-12 md:py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground">
                The passionate individuals behind our brand and designs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {[
                {
                  name: "Alex Morgan",
                  role: "Lead Designer",
                  image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1287&auto=format&fit=crop"
                },
                {
                  name: "Jordan Chen",
                  role: "Creative Director",
                  image: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=1287&auto=format&fit=crop"
                },
                {
                  name: "Taylor Reed",
                  role: "Master Craftsman",
                  image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop"
                },
                {
                  name: "Morgan Zhang",
                  role: "Materials Specialist",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop"
                }
              ].map((person) => (
                <div key={person.name} className="hover-lift">
                  <ImageLazy
                    src={person.image}
                    alt={person.name}
                    className="aspect-square object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-medium text-lg">{person.name}</h3>
                  <p className="text-muted-foreground">{person.role}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-muted/40 rounded-lg mt-12">
            <div className="text-center max-w-2xl mx-auto px-4">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Experience the Difference
              </h2>
              <p className="text-muted-foreground mb-8">
                Join us in our commitment to quality, design, and exceptional craftsmanship.
              </p>
              <Button asChild size="lg">
                <Link to="/shop">
                  Shop Collection
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
