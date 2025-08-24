import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const HomeScreen = () => {
  const navigation = useNavigation()

  const servicePackages = [
    {
      title: "Executive",
      subtitle: "Cleaning Service",
      price: "49.20€",
      services: [
        "Reinigung Schlafzimmer",
        "Betten aufbereiten",
        "Reinigung Wohnbereich",
        "Reinigung Küche",
        "Reinigung Bad (desinfizierend)",
        "Bereitstellung Reinigungsmittel",
      ],
    },
    {
      title: "CEO",
      subtitle: "Cleaning Service",
      price: "75.80€",
      services: [
        "Reinigung Schlafzimmer",
        "Betten aufbereiten",
        "Reinigung Wohnbereich",
        "Reinigung Küche",
        "Reinigung Bad (desinfizierend)",
        "Bereitstellung Reinigungsmittel",
        "Bereitstellung Verbrauchsartikel",
        "Geschirr spülen",
        "Bügelservice",
      ],
    },
  ]

  const serviceFeatures = {
    kompetenz: ["Reinigung mit Fachpersonal", "Erfahrung in der Hotelreinigung", "Einsatz geprüfter Reinigungsmittel"],
    qualitat: ["Regelmäßige Gütekontrollen", "Zertifiziertes Qualitätsmanagement", "Zertifiziertes Umweltmanagement"],
    sicherheit: [
      "Vertrauenswürdige Mitarbeiter mit polizeilichem Führungszeugnis und Gesundheitsnachweis",
      "Voller Versicherungsschutz",
      "Keine Vertragsbindung",
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>C</Text>
          </View>
          <Text style={styles.brandText}>CLEAVA</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <View style={styles.statusIcons}>
            <View style={styles.signalBars}>
              <View style={styles.signalBar}></View>
              <View style={styles.signalBar}></View>
              <View style={styles.signalBar}></View>
              <View style={styles.signalBarWeak}></View>
            </View>
            <Ionicons name="wifi" size={16} color="black" />
            <View style={styles.battery}>
              <View style={styles.batteryLevel}></View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Apartment cleaning service</Text>
              <Text style={styles.heroDescription}>
                Let us clean! We take care of cleaning your apartment professionally, so you'll have more time.
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Buchung" as never)} style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Make a request</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroImage}>
              <Image
                source={{ uri: "/person-cleaning-illustration.png" }}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={styles.serviceSection}>
          <Text style={styles.serviceSectionTitle}>Unser Haushaltshilfe-Service für anspruchsvolle Kunden</Text>

          <View style={styles.featuresContainer}>
            <View style={styles.featureGroup}>
              <Text style={styles.featureTitle}>Kompetenz</Text>
              {serviceFeatures.kompetenz.map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.featureGroup}>
              <Text style={styles.featureTitle}>Qualität</Text>
              {serviceFeatures.qualitat.map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.featureGroup}>
              <Text style={styles.featureTitle}>Sicherheit</Text>
              {serviceFeatures.sicherheit.map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.packagesSection}>
          {servicePackages.map((pkg, index) => (
            <View key={index} style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <View>
                  <Text style={styles.packageTitle}>{pkg.title}</Text>
                  <Text style={styles.packageSubtitle}>{pkg.subtitle}</Text>
                </View>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
              </View>

              <View style={styles.servicesList}>
                {pkg.services.map((service, serviceIndex) => (
                  <View key={serviceIndex} style={styles.serviceItem}>
                    <Ionicons name="checkmark" size={20} color="#10B981" />
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Buchung" as never)} style={styles.packageButton}>
                <Text style={styles.packageButtonText}>Make a request</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.testimonialSection}>
          <Text style={styles.testimonialTitle}>Das sagen unsere zufriedenen Kunden</Text>

          <View style={styles.testimonialCard}>
            <View style={styles.testimonialIcon}>
              <Ionicons name="chatbubble-outline" size={24} color="#10B981" />
            </View>
            <Text style={styles.testimonialText}>
              Wir wollten uns bei Ihnen und Ihrer Mitarbeiterin sehr herzlich für die Reinigungsarbeit bedanken. Ihre
              Mitarbeiterin hat eine exzellente Arbeit geleistet und wir sind hochzufrieden. Sie haben ein
              ausgezeichnetes Personal.
            </Text>
            <Text style={styles.testimonialAuthor}>Zufriedener Kunde, Unsere Kundenstimmen ansehen</Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    backgroundColor: "#14B8A6",
    borderRadius: 12,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  brandText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  signalBars: {
    flexDirection: "row",
    gap: 2,
  },
  signalBar: {
    width: 2,
    height: 12,
    backgroundColor: "#000000",
    borderRadius: 1,
  },
  signalBarWeak: {
    width: 2,
    height: 8,
    backgroundColor: "#9CA3AF",
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 2,
    padding: 1,
  },
  batteryLevel: {
    width: 16,
    height: 8,
    backgroundColor: "#000000",
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: "#5EEAD4",
    borderRadius: 16,
    padding: 24,
    overflow: "hidden",
  },
  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroText: {
    flex: 1,
    paddingRight: 16,
  },
  heroTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroDescription: {
    color: "#000000",
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  heroImage: {
    width: 96,
    height: 96,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  serviceSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  serviceSectionTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  featuresContainer: {
    gap: 24,
  },
  featureGroup: {
    marginBottom: 8,
  },
  featureTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    color: "#000000",
    marginRight: 8,
  },
  featureText: {
    color: "#000000",
    fontSize: 14,
    flex: 1,
  },
  packagesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  packageCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  packageTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  packageSubtitle: {
    color: "#000000",
    fontSize: 14,
  },
  packagePrice: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  servicesList: {
    gap: 12,
    marginBottom: 24,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceText: {
    color: "#000000",
    fontSize: 14,
    marginLeft: 12,
  },
  packageButton: {
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingVertical: 16,
  },
  packageButtonText: {
    color: "#ffffff",
    fontWeight: "500",
    textAlign: "center",
  },
  testimonialSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  testimonialTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  testimonialCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 24,
  },
  testimonialIcon: {
    flexDirection: "row",
    marginBottom: 16,
  },
  testimonialText: {
    color: "#000000",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 16,
  },
  testimonialAuthor: {
    color: "#6B7280",
    fontSize: 12,
  },
  bottomPadding: {
    height: 80,
  },
})

export default HomeScreen
