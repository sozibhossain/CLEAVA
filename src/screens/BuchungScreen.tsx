"use client"

import { useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"

const BuchungScreen = () => {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [bookingData, setBookingData] = useState({
    apartmentSize: "",
    cleaningInterval: "",
    householdSize: "",
    cleaningPackage: "executive",
    specialWish: "",
    appointment: {
      hasPreferredDate: false,
      preferredDate: "",
      preferredTime: "",
    },
    personalInfo: {
      salutation: "Herr",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: {
        houseNumber: "",
        zipCode: "",
        street: "",
        city: "",
      },
      howDidYouFindUs: "",
    },
  })

  const submitBooking = async () => {
    setIsLoading(true)
    try {
      const payload = {
        apartmentSize: bookingData.apartmentSize,
        cleaningInterval: bookingData.cleaningInterval,
        householdSize: Number.parseInt(bookingData.householdSize),
        cleaningPackage: {
          type: bookingData.cleaningPackage,
        },
        specialWish: bookingData.specialWish,
        appointment: {
          hasPreferredDate: bookingData.appointment.hasPreferredDate,
          preferredDate: bookingData.appointment.preferredDate
            ? new Date(bookingData.appointment.preferredDate).toISOString()
            : null,
          preferredTime: bookingData.appointment.preferredTime,
        },
        personalInfo: bookingData.personalInfo,
        price: {
          perCleaning: bookingData.cleaningPackage === "executive" ? 49.2 : 59.99,
          total: (bookingData.cleaningPackage === "executive" ? 49.2 : 59.99) * 4,
        },
      }

      const response = await axios.post("http://localhost:5000/api/v1/booking/create-booking", payload)

      if (response.data.success) {
        setCurrentStep(6) // Success screen
      }
    } catch (error) {
      Alert.alert("Fehler", "Buchung konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateBookingData = (field: string, value: any) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedData = (parent: string, field: string, value: any) => {
    setBookingData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value,
      },
    }))
  }

  const StatusBar = () => (
    <View style={styles.statusBar}>
      <Text style={styles.statusTime}>9:41</Text>
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
  )

  const Header = ({ title }: { title: string }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => (currentStep === 1 ? navigation.goBack() : prevStep())}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )

  const BottomNavigation = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="home-outline" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
        <Ionicons name="add-circle" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="menu-outline" size={26} color="black" />
      </TouchableOpacity>
    </View>
  )

  const Step1 = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Reinigung</Text>
        <Text style={styles.description}>
          Die benötigte Zeit zum Reinigen Ihres Appartements orientiert sich an Ihrer Wohnfläche. Geben Sie uns bitte
          zudem an, wie oft wir Ihr Appartement im Monat reinigen und welche Extras Sie dazubuchen möchten.
        </Text>

        <Text style={styles.description}>
          AppClean ist in folgenden Städten verfügbar:{"\n\n"}
          Berlin, Frankfurt, Hamburg, München, Nürnberg, Stuttgart
        </Text>

        <Text style={styles.sectionTitle}>Appartement und Reinigungsintervall</Text>
        <Text style={styles.inputLabel}>Appartement-Größe</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Wohnungsgröße hier eintragen..."
          value={bookingData.apartmentSize}
          onChangeText={(value) => updateBookingData("apartmentSize", value)}
        />

        <Text style={styles.inputLabel}>Reinigungsintervall</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Reinigungsintervall hier eintragen..."
          value={bookingData.cleaningInterval}
          onChangeText={(value) => updateBookingData("cleaningInterval", value)}
        />

        <Text style={styles.inputLabel}>Anzahl Personen im Haushalt</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tragen Sie hier die Anzahl der Personen ein..."
          value={bookingData.householdSize}
          onChangeText={(value) => updateBookingData("householdSize", value)}
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Cleaning Service Paket</Text>

        <TouchableOpacity
          style={styles.packageOption}
          onPress={() => updateBookingData("cleaningPackage", "executive")}
        >
          <View style={styles.packageRow}>
            <View style={styles.radioButton}>
              {bookingData.cleaningPackage === "executive" && <View style={styles.radioButtonSelected} />}
            </View>
            <View style={styles.packageContent}>
              <Text style={styles.packageTitle}>Executive Cleaning Service</Text>
              <Text style={styles.packageItem}>• Reinigung Schlafzimmer</Text>
              <Text style={styles.packageItem}>• Betten aufbereiten</Text>
              <Text style={styles.packageItem}>• Reinigung Wohnbereich</Text>
              <Text style={styles.packageItem}>• Reinigung Küche</Text>
              <Text style={styles.packageItem}>• Reinigung Bad (desinfizierend)</Text>
              <Text style={styles.packageItem}>• Bereitstellung Reinigungsmittel</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.packageOption} onPress={() => updateBookingData("cleaningPackage", "ceo")}>
          <View style={styles.packageRow}>
            <View style={styles.radioButton}>
              {bookingData.cleaningPackage === "ceo" && <View style={styles.radioButtonSelected} />}
            </View>
            <View style={styles.packageContent}>
              <Text style={styles.packageTitle}>CEO Cleaning Service</Text>
              <Text style={styles.packageItem}>• Reinigung Schlafzimmer</Text>
              <Text style={styles.packageItem}>• Betten aufbereiten</Text>
              <Text style={styles.packageItem}>• Reinigung Wohnbereich</Text>
              <Text style={styles.packageItem}>• Reinigung Küche</Text>
              <Text style={styles.packageItem}>• Reinigung Bad (desinfizierend)</Text>
              <Text style={styles.packageItem}>• Bereitstellung Reinigungsmittel</Text>
              <Text style={styles.packageItem}>• Bereitstellung Verbrauchsartikel</Text>
              <Text style={styles.packageItem}>• Geschirr spülen</Text>
              <Text style={styles.packageItem}>• Bügelservice</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Extras</Text>
        <Text style={styles.description}>
          Optional zu unseren Cleaning Service Paketen können Sie noch Extraleistungen in Anspruch nehmen und uns
          besondere Wünsche mitteilen, die wir gerne berücksichtigen.
        </Text>

        <Text style={styles.inputLabel}>Besondere Wünsche</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Schreiben Sie hier..."
          value={bookingData.specialWish}
          onChangeText={(value) => updateBookingData("specialWish", value)}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
          <Text style={styles.primaryButtonText}>Bestätigen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )

  const Step2 = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Termin</Text>
        <Text style={styles.description}>
          Here, you can let us know which day of the week and when our cleaning personnel will clean your apartment.
        </Text>

        <Text style={styles.sectionTitle}>Do you have a preferred date?</Text>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => updateNestedData("appointment", "hasPreferredDate", true)}
        >
          <View style={styles.radioButton}>
            {bookingData.appointment.hasPreferredDate && <View style={styles.radioButtonSelected} />}
          </View>
          <Text style={styles.radioText}>Yes, I have a preferred date.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => updateNestedData("appointment", "hasPreferredDate", false)}
        >
          <View style={styles.radioButton}>
            {!bookingData.appointment.hasPreferredDate && <View style={styles.radioButtonSelected} />}
          </View>
          <Text style={styles.radioText}>No I haven't.</Text>
        </TouchableOpacity>

        {!bookingData.appointment.hasPreferredDate && (
          <View style={styles.noDateSection}>
            <Text style={styles.sectionTitle}>Kein Wunschtermin?</Text>
            <Text style={styles.description}>
              In diesem Fall kümmern wir uns gerne um die Terminierung und machen Ihnen mögliche Terminvorschläge.
            </Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={nextStep}>
            <Text style={styles.secondaryButtonText}>Bestätigen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={prevStep}>
            <Text style={styles.primaryButtonText}>Zurück</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )

  const Step3 = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Termin</Text>
        <Text style={styles.description}>
          Hier können Sie uns mitteilen, an welchem Wochentag und zu welcher Uhrzeit unsere Reinigungskraft Ihr
          Appartement reinigt.
        </Text>

        <Text style={styles.sectionTitle}>Haben Sie einen Wunschtermin?</Text>

        <TouchableOpacity style={styles.radioOption}>
          <View style={styles.radioButton}>
            <View style={styles.radioButtonSelected} />
          </View>
          <Text style={styles.radioText}>Ja, ich habe einen Wunschtermin.</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Erster Wunschtermin</Text>

        <View style={styles.buttonRow}>
          <View style={styles.flexItem}>
            <Text style={styles.inputLabel}>Bevorzugter Tag</Text>
            <TouchableOpacity style={[styles.textInput, { flexDirection: "row", alignItems: "center" }]}>
              <Ionicons name="calendar-outline" size={20} color="gray" />
              <Text style={styles.text}>10 Dec 25</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.inputLabel}>Bevorzugte Uhrzeit</Text>
            <TouchableOpacity style={[styles.textInput, { flexDirection: "row", alignItems: "center" }]}>
              <Ionicons name="time-outline" size={20} color="gray" />
              <Text style={styles.text}>11:00 PM</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={nextStep}>
            <Text style={styles.secondaryButtonText}>Bestätigen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={prevStep}>
            <Text style={styles.primaryButtonText}>Zurück</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )

  const Step4 = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Persönliches</Text>
        <Text style={styles.description}>
          Teilen Sie uns bitte Ihre persönlichen Daten mit und wann wir Sie am Besten erreichen können.
        </Text>

        <Text style={styles.sectionTitle}>Persönliche Daten</Text>

        <View style={styles.buttonRow}>
          <View style={styles.flexItem}>
            <Text style={styles.inputLabel}>Anrede</Text>
            <View style={styles.textInput}>
              <Text style={styles.text}>Herr</Text>
            </View>
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.inputLabel}>Bitte kontaktieren Sie mich:</Text>
            <View style={styles.textInput}>
              <Text style={styles.text}>per E-mail</Text>
            </View>
          </View>
        </View>

        <Text style={styles.inputLabel}>Vorname</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tragen Sie hier Ihren Vornamen ein..."
          value={bookingData.personalInfo.firstName}
          onChangeText={(value) => updateNestedData("personalInfo", "firstName", value)}
        />

        <Text style={styles.inputLabel}>Nachname</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tragen Sie hier Ihren Nachnamen ein..."
          value={bookingData.personalInfo.lastName}
          onChangeText={(value) => updateNestedData("personalInfo", "lastName", value)}
        />

        <Text style={styles.inputLabel}>Telefon</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tragen Sie hier Ihre Telefonnummer ein..."
          value={bookingData.personalInfo.phone}
          onChangeText={(value) => updateNestedData("personalInfo", "phone", value)}
          keyboardType="phone-pad"
        />

        <Text style={styles.inputLabel}>E-Mail</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tragen Sie hier Ihre E-Mail-Adresse ein..."
          value={bookingData.personalInfo.email}
          onChangeText={(value) => updateNestedData("personalInfo", "email", value)}
          keyboardType="email-address"
        />

        <Text style={styles.sectionTitle}>Address</Text>

        <View style={styles.buttonRow}>
          <View style={styles.flexItem}>
            <Text style={styles.inputLabel}>Nr.</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nr. hier eintragen..."
              value={bookingData.personalInfo.address.houseNumber}
              onChangeText={(value) => {
                setBookingData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    address: {
                      ...prev.personalInfo.address,
                      houseNumber: value,
                    },
                  },
                }))
              }}
            />
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.inputLabel}>PLZ</Text>
            <TextInput
              style={styles.textInput}
              placeholder="PLZ code hier eingeben..."
              value={bookingData.personalInfo.address.zipCode}
              onChangeText={(value) => {
                setBookingData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    address: {
                      ...prev.personalInfo.address,
                      zipCode: value,
                    },
                  },
                }))
              }}
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>Straße</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tragen Sie hier Ihren Straßennamen ein..."
          value={bookingData.personalInfo.address.street}
          onChangeText={(value) => {
            setBookingData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                address: {
                  ...prev.personalInfo.address,
                  street: value,
                },
              },
            }))
          }}
        />

        <Text style={styles.inputLabel}>Ort</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Schreiben Sie hier Ihren Ortsnamen..."
          value={bookingData.personalInfo.address.city}
          onChangeText={(value) => {
            setBookingData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                address: {
                  ...prev.personalInfo.address,
                  city: value,
                },
              },
            }))
          }}
        />

        <Text style={styles.sectionTitle}>Wie wurden Sie auf uns aufmerksam?</Text>
        <Text style={styles.description}>
          Wurden Sie durch Ihren Arbeitgeber auf AppClean aufmerksam, haben Sie uns in einer Werbung wahrgenommen oder
          wurden wir empfohlen? Wir freuen uns über eine Info hierzu!
        </Text>

        <Text style={styles.inputLabel}>Ich wurde auf AppClean aufmerksam durch</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Schreiben Sie hier..."
          value={bookingData.personalInfo.howDidYouFindUs}
          onChangeText={(value) => updateNestedData("personalInfo", "howDidYouFindUs", value)}
        />

        <Text style={styles.sectionTitle}>Datenschutz</Text>
        <View style={styles.packageRow}>
          <View style={styles.radioButton}></View>
          <Text style={styles.packageItem}>
            Ich habe die Datenschutzerklärung zur Kenntnis genommen. Ich stimme zu, dass meine Angaben und Daten zur
            Beantwortung meiner Anfrage elektronisch erhoben und gespeichert werden. Hinweis: Sie können Ihre
            Einwilligung jederzeit für die Zukunft per E-Mail an info@weil-reinigungsservice.de widerrufen.
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={nextStep}>
            <Text style={styles.secondaryButtonText}>Bestätigen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={prevStep}>
            <Text style={styles.primaryButtonText}>Zurück</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )

  const Step5 = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Confirmation</Text>
        <Text style={styles.description}>Eine letzte Kontrolle der Daten, dann abschicken!</Text>

        <Text style={styles.sectionTitle}>Reinigung</Text>
        <View style={styles.noDateSection}>
          <Text style={styles.text}>Apartment Size: {bookingData.apartmentSize}</Text>
          <Text style={styles.text}>Cleaning Interval: {bookingData.cleaningInterval}</Text>
          <Text style={styles.text}>Person: {bookingData.householdSize} numbers of people</Text>
          <Text style={styles.text}>
            Cleaning service Package:{" "}
            {bookingData.cleaningPackage === "executive" ? "Executive Package" : "CEO Package"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Termin</Text>
        <View style={styles.noDateSection}>
          <Text style={styles.text}>
            Desired appointment?:{" "}
            {bookingData.appointment.hasPreferredDate ? "Yes, I have a preferred appointment date." : "No"}
          </Text>
          {bookingData.appointment.hasPreferredDate && (
            <Text style={styles.text}>First desired appointment: Tuesday 06:15 Uhr</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Persönliches</Text>
        <View style={styles.noDateSection}>
          <Text style={styles.text}>
            Name: {bookingData.personalInfo.firstName} {bookingData.personalInfo.lastName}
          </Text>
          <Text style={styles.text}>Telefon: {bookingData.personalInfo.phone}</Text>
          <Text style={styles.text}>Email: {bookingData.personalInfo.email}</Text>
          <Text style={styles.text}>Kontakt: Tuesday 06:15 Uhr</Text>
          <Text style={styles.text}>Nr.: {bookingData.personalInfo.address.houseNumber}</Text>
          <Text style={styles.text}>PLZ Code: {bookingData.personalInfo.address.zipCode}</Text>
          <Text style={styles.text}>Straße: {bookingData.personalInfo.address.street}</Text>
          <Text style={styles.text}>Ort: {bookingData.personalInfo.address.city}</Text>
          <Text style={styles.text}>Ich wurde auf Appclean aufmerksam durch: I became aware of Appclean through</Text>
        </View>

        <Text style={styles.description}>
          Ich habe die Datenschutzerklärung zur Kenntnis genommen. Ich stimme zu, dass meine Angaben und Daten zur
          Beantwortung meiner Anfrage elektronisch erhoben und gespeichert werden. Hinweis: Sie können Ihre Einwilligung
          jederzeit für die Zukunft per E-Mail an info@weil-reinigungsservice.de widerrufen.
        </Text>

        <Text style={styles.sectionTitle}>IHR PREIS</Text>
        <View style={styles.packageRow}>
          <View style={[styles.radioButton, { backgroundColor: "#4FD1C7" }]}></View>
          <Text style={styles.packageTitle}>Paket CEO</Text>
        </View>

        <View style={styles.buttonRow}>
          <Text style={styles.text}>49,20€</Text>
          <Text style={styles.text}>je Reinigung</Text>
          <Text style={styles.text}>196,80€</Text>
          <Text style={styles.text}>je Reinigung</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
            <Text style={styles.secondaryButtonText}>Bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={submitBooking} disabled={isLoading}>
            <Text style={styles.primaryButtonText}>{isLoading ? "Wird gesendet..." : "Einreichen"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )

  const Step6 = () => (
    <View style={[styles.safeArea, { justifyContent: "center" }]}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Vielen Dank für Ihre Buchungsanfrage!</Text>
        <Text style={styles.description}>
          Ihre Daten wurden an uns übermittelt und werden jetzt bearbeitet. Eine Bestätigung Ihrer Buchung, sowie
          weitere Informationen werden Ihnen in Kürze zugeschickt.
        </Text>
        <Text style={styles.description}>
          Bei Fragen stehen wir gerne rund um die Uhr unter der Telefonnummer 0171 / 33 4 55 71 zu Ihrer Verfügung.
        </Text>
        <Text style={styles.description}>Mit freundlichen Grüßen,</Text>
        <Text style={styles.description}>Ihr AppClean Team</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Home" as never)}>
          <Text style={styles.primaryButtonText}>Zurück zur Startseite</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return bookingData.appointment.hasPreferredDate ? <Step3 /> : <Step4 />
      case 4:
        return bookingData.appointment.hasPreferredDate ? <Step4 /> : <Step5 />
      case 5:
        return <Step5 />
      case 6:
        return <Step6 />
      default:
        return <Step1 />
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      {currentStep < 6 && <Header title="Buchungsanfrage" />}
      {renderStep()}
      {currentStep < 6 && <BottomNavigation />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  statusTime: {
    color: "#000000",
    fontWeight: "500",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  signalBars: {
    flexDirection: "row",
    gap: 4,
  },
  signalBar: {
    width: 4,
    height: 12,
    backgroundColor: "#000000",
    borderRadius: 2,
  },
  signalBarWeak: {
    width: 4,
    height: 8,
    backgroundColor: "#9CA3AF",
    borderRadius: 2,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  batteryLevel: {
    width: 16,
    height: 8,
    backgroundColor: "#000000",
    borderRadius: 1,
    margin: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    color: "#000000",
  },
  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#B2F5EA",
    borderRadius: 32,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonActive: {
    backgroundColor: "#4FD1C7",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#000000",
  },
  description: {
    color: "#374151",
    marginBottom: 16,
    lineHeight: 20,
  },
  inputLabel: {
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    height: 96,
  },
  packageOption: {
    marginBottom: 16,
  },
  packageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EF4444",
    marginRight: 12,
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  packageContent: {
    flex: 1,
  },
  packageTitle: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#000000",
  },
  packageItem: {
    color: "#374151",
    fontSize: 14,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioText: {
    color: "#374151",
  },
  noDateSection: {
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 16,
  },
  secondaryButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#000000",
  },
  flexItem: {
    flex: 1,
  },
  text: {
    color: "#374151",
    marginLeft: 8,
  },
})

export default BuchungScreen
