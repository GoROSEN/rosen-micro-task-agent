import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, ActivityIndicator, Modal, LayoutAnimation, UIManager, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserCheck, ShieldCheck, Zap, Bot, DollarSign, X } from 'lucide-react-native';

const ROSEN_BLUE = '#6376FF';
const ROSEN_TAG_ORANGE = '#FF9D66';
const BG_COLOR = '#F6F8FE';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ChatBubble = ({ sender, text, translateTo }) => {
  const isMe = sender === 'me';
  return (
    <View style={[styles.bubbleContainer, { justifyContent: isMe ? 'flex-end' : 'flex-start' }]}>
      {!isMe && <View style={styles.agentAvatar}><Text style={{fontSize: 10}}>A</Text></View>}
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleAgent]}>
        {translateTo && (
          <View style={styles.translationContainer}>
            <View style={styles.translateTag}><Text style={styles.translateTagText}>ES 🇪🇸</Text></View>
            <Text style={[styles.translateText, {color: isMe ? '#DDE3FF' : '#555'}]}>{translateTo}</Text>
          </View>
        )}
        <View style={styles.translationContainer}>
          <View style={[styles.translateTag, {backgroundColor: ROSEN_BLUE + '20'}]}><Text style={[styles.translateTagText, {color: ROSEN_BLUE}]}>EN 🇬🇧</Text></View>
          <Text style={[styles.bubbleText, { color: isMe ? 'white' : 'black' }]}>{text}</Text>
        </View>
      </View>
      {isMe && <View style={[styles.agentAvatar, {borderColor: ROSEN_BLUE}]}><Text style={{color: ROSEN_BLUE, fontSize: 10}}>S</Text></View>}
    </View>
  );
};

const TaskCard = ({ budget, title, description, onAccept }) => (
  <TouchableOpacity style={styles.taskCard} onPress={onAccept}>
    <View style={styles.taskCardIcon}><DollarSign color={ROSEN_BLUE} size={28} /></View>
    <View style={styles.taskCardContent}>
      <View style={styles.taskCardHeader}>
        <Text style={styles.taskBudget}>{budget} USDC</Text>
        <View style={[styles.tag, {backgroundColor: ROSEN_BLUE}]}>
          <Text style={styles.tagText}>HUMAN ONLY</Text>
        </View>
      </View>
      <Text style={styles.taskTitle}>{title}</Text>
      <Text style={styles.taskDesc}>{description}</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
  const [step, setStep] = useState(0); 
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [showPaymentBubble, setShowPaymentBubble] = useState(false);
  const [showWorldIDModal, setShowWorldIDModal] = useState(false);

  const addTerminalLog = (log) => {
    setTerminalLogs(prev => [...prev, `> ${log}`]);
  };

  const handleVerify = () => {
    setShowWorldIDModal(true);
  };

  const onWorldIDSuccess = () => {
    setShowWorldIDModal(false);
    setStep(1);
    addTerminalLog("Establishing secure XMTP relay node...");
    setTimeout(() => addTerminalLog("🛡️ [WORLD_ID] ZK-Proof status: HUMAN_VERIFIED"), 800);
    setTimeout(() => addTerminalLog("🤖 [AGENT] Fetching 'Orb-only' global tasks via XMTP..."), 1600);
    setTimeout(() => addTerminalLog("📡 [XMTP] Connected to 0xRecruiter (Global Pool)"), 2400);
    setTimeout(() => addTerminalLog("✅ [AGENT] Match Complete: 6 Missions found."), 3200);
  };

  const proceedToRecommendations = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(2);
  };

  const acceptMission = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(3);
    setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowPaymentBubble(true);
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={[styles.header, {height: step > 1 ? 120 : 250}]}>
          <View style={styles.statusBarMock}><Text style={styles.timeMock}>4:02</Text><Text style={styles.iconMock}>📶 🔋</Text></View>
          <Text style={styles.appTitle}>ROSEN Micro-Task Agent</Text>
          <Text style={styles.appDesc}>Leveraging World ID & Coinbase AgentKit for trusted global earnings.</Text>
          {step === 0 && (
              <TouchableOpacity style={styles.verifyBanner} onPress={handleVerify}>
                <View style={styles.verifyBannerContent}>
                  <Text style={styles.verifyTitle}>EARN NOW!!!</Text>
                  <Text style={styles.verifyDesc}>Verify with World ID to unlock AI Agents.</Text>
                </View>
                <Zap color={ROSEN_BLUE} size={32} />
              </TouchableOpacity>
          )}
      </View>

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
        {step === 0 && (
            <View style={styles.homeContent}>
                <View style={styles.actionCard}><UserCheck color={ROSEN_BLUE} /><Text style={styles.actionTitle}>Rent A Human?</Text></View>
                <View style={styles.taskCardMock}><ShieldCheck color="#ccc" /><Text style={{color: '#aaa', fontSize: 11}}>Verify World ID to access pool.</Text></View>
            </View>
        )}

        {step === 1 && (
            <View style={styles.terminalContainer}>
                <View style={styles.agentAvatarBig}><Bot color={ROSEN_BLUE} size={32} /></View>
                <Text style={styles.matchTitle}>Agent is Negotiating...</Text>
                <ScrollView style={styles.terminal}>
                    {terminalLogs.map((log, i) => <Text key={i} style={styles.terminalText}>{log}</Text>)}
                    {terminalLogs.length < 6 && <ActivityIndicator color={ROSEN_BLUE} size="small" style={{marginTop: 10}} />}
                </ScrollView>
                {terminalLogs.length >= 6 && (
                    <TouchableOpacity style={styles.primaryBtn} onPress={proceedToRecommendations}>
                        <Text style={styles.primaryBtnText}>Show Recommendations</Text>
                    </TouchableOpacity>
                )}
            </View>
        )}

        {step === 2 && (
            <View style={styles.recommendationsContainer}>
                <Text style={styles.phaseTitle}>Today's Picks</Text>
                <TaskCard budget="50.00" title="Nigeria Market Survey" description="Collect consumer behavior data." onAccept={acceptMission} />
                <TaskCard budget="20.00" title="LatAm App Testing" description="Beta test for fintech application." onAccept={acceptMission} />
            </View>
        )}

        {step === 3 && (
            <View style={styles.chatContainer}>
                <View style={styles.chatHeader}><Text style={styles.chatHeaderTitle}>Mission: Nigeria Survey</Text></View>
                <ChatBubble sender="agent" translateTo="Lo estoy editando ahora." text="I'm editing it now." />
                <ChatBubble sender="me" text="Ok, mission completed. Agent verified World ID status." />
                {showPaymentBubble && (
                    <Animated.View style={[styles.paymentBubble, styles.rosenListItem]}>
                        <View style={styles.paymentBubbleHeader}>
                            <DollarSign color={ROSEN_BLUE} size={16} />
                            <Text style={styles.paymentStatus}>Settlement Success (x402)</Text>
                        </View>
                        <View style={styles.paymentSplit}>
                            <View>
                                <Text style={styles.paymentEntity}>Stella Zheng (You)</Text>
                                <Text style={styles.paymentRatio}>90% Reward Share</Text>
                            </View>
                            <Text style={styles.paymentAmount}>+45.00</Text>
                        </View>
                    </Animated.View>
                )}
            </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.navItem}><Text>🪐</Text><Text style={styles.navText}>Planet</Text></View>
        <View style={[styles.navItem, styles.navActive]}><Text style={{color: ROSEN_BLUE, fontWeight: 'bold'}}>R</Text><Text style={[styles.navText, {color: ROSEN_BLUE}]}>ROSEN</Text></View>
        <View style={styles.navItem}><Text>💬</Text><Text style={styles.navText}>Friends</Text></View>
      </View>

      <Modal visible={showWorldIDModal} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
              <View style={styles.worldIDModal}>
                  <Text style={styles.worldIDModalTitle}>WORLD ID</Text>
                  <Text style={styles.worldIDModalDesc}>Please scan with World App to verify.</Text>
                  <View style={styles.orbMock}><Text style={styles.worldIDVibeIcon}>W</Text></View>
                  <TouchableOpacity style={styles.worldIDBtn} onPress={onWorldIDSuccess}>
                      <Text style={styles.worldIDBtnText}>Verify with World App</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowWorldIDModal(false)}><X color="#999" size={24} /></TouchableOpacity>
              </View>
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR },
  header: { backgroundColor: ROSEN_BLUE, paddingHorizontal: 20, paddingTop: 50, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  statusBarMock: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  timeMock: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  iconMock: { color: 'white', fontSize: 12 },
  appTitle: { color: 'white', fontSize: 22, fontWeight: '900', marginBottom: 4 },
  appDesc: { color: '#DDE3FF', fontSize: 10, marginBottom: 20 },
  verifyBanner: { backgroundColor: 'white', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  verifyBannerContent: { flex: 1 },
  verifyTitle: { color: ROSEN_BLUE, fontSize: 18, fontWeight: '900' },
  verifyDesc: { color: '#999', fontSize: 10 },
  mainContent: { flex: 1 },
  scrollContent: { padding: 20 },
  homeContent: { gap: 15 },
  actionCard: { backgroundColor: 'white', padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10 },
  actionTitle: { fontWeight: 'bold', fontSize: 14, color: ROSEN_BLUE },
  taskCardMock: { backgroundColor: 'white', padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10 },
  footer: { height: 80, borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 9, marginTop: 3, color: '#999' },
  navActive: { fontWeight: 'bold' },
  terminalContainer: { alignItems: 'center' },
  agentAvatarBig: { backgroundColor: '#E2E6FF', width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  matchTitle: { color: ROSEN_BLUE, fontSize: 16, fontWeight: 'bold' },
  terminal: { backgroundColor: 'black', borderRadius: 20, padding: 15, width: '100%', height: 160, marginTop: 15 },
  terminalText: { color: '#00FF41', fontSize: 10, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', marginBottom: 4 },
  primaryBtn: { backgroundColor: ROSEN_BLUE, borderRadius: 15, paddingVertical: 12, paddingHorizontal: 20, marginTop: 20 },
  primaryBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  taskCard: { backgroundColor: 'white', borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  taskBudget: { color: ROSEN_TAG_ORANGE, fontWeight: 'bold', fontSize: 16 },
  tag: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginLeft: 10 },
  tagText: { color: 'white', fontSize: 8, fontWeight: 'bold' },
  taskTitle: { color: 'black', fontWeight: 'bold', fontSize: 13, marginTop: 5 },
  taskDesc: { color: '#aaa', fontSize: 10 },
  chatContainer: { flex: 1 },
  chatHeader: { height: 40, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: 15 },
  chatHeaderTitle: { fontWeight: 'bold', fontSize: 13 },
  bubbleContainer: { flexDirection: 'row', marginBottom: 15 },
  agentAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E2E6FF', alignItems: 'center', justifyContent: 'center' },
  bubble: { padding: 12, maxWidth: '80%', borderRadius: 15, marginLeft: 10 },
  bubbleMe: { backgroundColor: ROSEN_BLUE, marginRight: 10 },
  bubbleAgent: { backgroundColor: '#E2E6FF' },
  translateTag: { paddingHorizontal: 4, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.05)', marginRight: 5 },
  translateTagText: { fontSize: 8, fontWeight: 'bold' },
  translationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  paymentBubble: { marginTop: 15 },
  rosenListItem: { borderRadius: 20, padding: 15, borderHeight: 2, borderColor: ROSEN_BLUE, backgroundColor: 'white' },
  paymentBubbleHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  paymentStatus: { color: '#00a822', fontWeight: 'bold', fontSize: 10 },
  paymentSplit: { flexDirection: 'row', justifyContent: 'space-between' },
  paymentEntity: { fontWeight: 'bold', fontSize: 12 },
  paymentAmount: { fontWeight: '900', fontSize: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  worldIDModal: { backgroundColor: 'white', borderRadius: 40, padding: 30, width: '100%', alignItems: 'center' },
  worldIDModalTitle: { fontSize: 18, fontWeight: 'bold' },
  worldIDModalDesc: { color: '#aaa', fontSize: 11, marginBottom: 20 },
  orbMock: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  worldIDVibeIcon: { color: 'white', fontSize: 40, fontWeight: 'bold' },
  worldIDBtn: { backgroundColor: 'black', borderRadius: 15, paddingVertical: 15, paddingHorizontal: 20, width: '100%', marginBottom: 15 },
  worldIDBtnText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
