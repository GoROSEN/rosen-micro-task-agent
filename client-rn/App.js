import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Animated, ActivityIndicator, Alert, Modal, LayoutAnimation, UIManager, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserCheck, ShieldCheck, Zap, Bot, Mail, DollarSign, ArrowRight, X } from 'lucide-react-native';
// import { IDKitWidget } from '@worldcoin/idkit-react-native'; // 实际黑客松需解除注释// ROSEN 风格配置const ROSEN_BLUE = '#6376FF';
const ROSEN_TAG_ORANGE = '#FF9D66';
const BG_COLOR = '#F6F8FE';

// 如果是 Android，启用 LayoutAnimationif (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- 模仿你的 image_4 的聊天气泡组件 (带 AI 翻译) ---const ChatBubble = ({ sender, text, translateTo }) => {
  const isMe = sender === 'me';
  return (
    <View style={[styles.bubbleContainer, { justifyContent: isMe ? 'flex-end' : 'flex-start' }]}>
      {!isMe && <View style={styles.agentAvatar}><Text style={{fontSize: 10}}>A</Text></View>}
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleAgent]}>
        {translateTo && (
          <View style={styles.translationContainer}><View style={styles.translateTag}><Text style={styles.translateTagText}>ES 🇪🇸</Text></View><Text style={[styles.translateText, {color: isMe ? '#DDE3FF' : '#555'}]}>{translateTo}</Text></View>
        )}
        <View style={styles.translationContainer}><View style={[styles.translateTag, {backgroundColor: ROSEN_BLUE + '20'}]}><Text style={[styles.translateTagText, {color: ROSEN_BLUE}]}>EN 🇬🇧</Text></View><Text style={[styles.bubbleText, { color: isMe ? 'white' : 'black' }]}>{text}</Text></View></View>
      {isMe && <View style={[styles.agentAvatar, {borderColor: ROSEN_BLUE}]}><Text style={{color: ROSEN_BLUE}}>S</Text></View>}
    </View>
  );
};

// --- 模仿你的 image_0 的任务卡片组件 (带 Agent 标签) ---const TaskCard = ({ budget, title, description, onAccept }) => (
  <TouchableOpacity style={styles.taskCard} onPress={onAccept}><View style={styles.taskCardIcon}><DollarSign color={ROSEN_BLUE} size={28} /></View><View style={styles.taskCardContent}><View style={styles.taskCardHeader}><Text style={styles.taskBudget}>{budget} USDC</Text><View style={[styles.tag, {backgroundColor: ROSEN_BLUE}]}><Text style={styles.tagText}>HUMAN ONLY (Orb)</Text></View></View><Text style={styles.taskTitle}>{title}</Text><Text style={styles.taskDesc}>{description}</Text></View></TouchableOpacity>
);

export default function App() {
  const [step, setStep] = useState(0); // 0: Verify, 1: Match, 2: Recommendations, 3: Collaborationconst [terminalLogs, setTerminalLogs] = useState([]);
  const [showPaymentBubble, setShowPaymentBubble] = useState(false);
  const [showWorldIDModal, setShowWorldIDModal] = useState(false);

  const addTerminalLog = (log) => {
    setTerminalLogs(prev => [...prev, `> ${log}`]);
  };

  // 1. 启动验证流程 (模拟 World ID IDKit 唤起)const handleVerify = () => {
    setShowWorldIDModal(true);
  };

  // 模拟 World ID 验证成功const onWorldIDSuccess = () => {
    setShowWorldIDModal(false);
    setStep(1);
    addTerminalLog("Establishing secure XMTP relay node...");
    
    setTimeout(() => addTerminalLog("🛡️ [WORLD_ID] ZK-Proof status: HUMAN_VERIFIED"), 800);
    setTimeout(() => addTerminalLog("🤖 [AGENT] Fetching 'Orb-only' global tasks via XMTP..."), 1600);
    setTimeout(() => addTerminalLog("📡 [XMTP] Connected to 0xRecruiter (LatAm/SEA Pool)"), 2400);
    setTimeout(() => addTerminalLog("✅ [AGENT] Match Complete: 6 Human-Only Missions found."), 3200);
  };

  const proceedToRecommendations = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(2);
  };

  const acceptMission = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(3);
    // 模拟任务完成后，Agent 发送支付通知setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowPaymentBubble(true);
    }, 2500);
  };

  return (
    <View style={styles.container}><StatusBar style="auto" />
      
      {/* ROSEN Blue Header (模仿你的 image_1) */}
      <View style={[styles.header, {height: step > 1 ? 120 : 250}]}>
          <View style={styles.statusBarMock}><Text style={styles.timeMock}>4:02</Text><Text style={styles.iconMock}>📶 🔋</Text></View><Text style={styles.appTitle}>ROSEN Micro-Task Agent</Text><Text style={styles.appDesc}>Leveraging World ID & Coinbase AgentKit for trusted global earnings.</Text>
          
          {step === 0 && (
              <TouchableOpacity style={styles.verifyBanner} onPress={handleVerify}><View style={styles.verifyBannerContent}><Text style={styles.verifyTitle}>EARN NOW!!!</Text><Text style={styles.verifyDesc}>Verify with World ID to unlock <br/>AI Agents & premium missions.</Text></div><Zap color="white" size={32} /></TouchableOpacity>
          )}
      </View><ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
        
        {/* PHASE 1: Verify (首页挂起状态) */}
        {step === 0 && (
            <View style={styles.homeContent}><View style={styles.actionCard}><UserCheck color={ROSEN_BLUE} /><Text style={styles.actionTitle}>Rent A Human?</Text></View><View style={styles.taskCardMock}><ShieldCheck color="#ccc" /><Text style={{color: '#aaa', fontSize: 12}}>Premium tasks are locked. Verify World ID.</Text></View></View>
        )}

        {/* PHASE 2: Match (Agent Terminal) */}
        {step === 1 && (
            <View style={styles.terminalContainer}><View style={styles.agentAvatarBig}><Bot color={ROSEN_BLUE} size={32} /></View><Text style={styles.matchTitle}>Agent is Negotiating...</Text><Text style={styles.matchDesc}>Negotiation logic running via AgentKit & XMTP</Text><ScrollView style={styles.terminal} contentContainerStyle={styles.terminalScroll}>
                    {terminalLogs.map((log, i) => <Text key={i} style={styles.terminalText}>{log}</Text>)}
                    <ActivityIndicator color={ROSEN_BLUE} size="small" style={{marginTop: 10}} /></ScrollView>

                {terminalLogs.length >= 6 && (
                    <TouchableOpacity style={styles.primaryBtn} onPress={proceedToRecommendations}><Text style={styles.primaryBtnText}>Show Recommendations</Text></TouchableOpacity>
                )}
            </View>
        )}

        {/* PHASE 3: Recommendations (模仿你的 image_0) */}
        {step === 2 && (
            <View style={styles.recommendationsContainer}><Text style={styles.phaseTitle}>Today's Picks</Text><TaskCard budget="50.00" title="Nigeria Market Research" description="Collect consumer behavior data. (Verified Humans only)" onAccept={acceptMission} /><TaskCard budget="20.00" title="LatAm App Testing" description="Beta test a new fintech app." onAccept={acceptMission} /><View style={[styles.taskCardMock, {opacity: 0.5}]}><DollarSign color="#ccc" /><Text style={{color: '#aaa', fontSize: 12}}>Other tasks...</Text></View></View>
        )}

        {/* PHASE 4: Collaboration & Payment (模仿你的 image_4) */}
        {step === 3 && (
            <View style={styles.chatContainer}><View style={styles.chatHeader}><Text style={styles.chatHeaderTitle}>Mission: Nigeria Survey</Text></View><ChatBubble sender="agent" translateTo="Lo estoy editando ahora." text="I'm editing it now." /><ChatBubble sender="me" text="Ok, got it. Task completed. Agent confirmed World ID proof." /><ChatBubble sender="agent" translateTo="Mas tarde te envio el video." text="Later I send you the video on..." />
                
                {/* 模拟的 x402 智能分润支付气泡 */}
                {showPaymentBubble && (
                    <Animated.View style={[styles.paymentBubble, styles.rosenListItem]}><View style={styles.paymentBubbleHeader}><DollarSign color={ROSEN_BLUE} size={16} /><Text style={styles.paymentStatus}>On-chain Settlement Success (x402)</Text></div><View style={styles.paymentSplit}><View><Text style={styles.paymentEntity}>Stella Zheng (You)</p><Text style={styles.paymentRatio}>90% Contributor Reward</p></div><Text style={styles.paymentAmount}>+45.00 USDC</Text></div><View style={[styles.paymentSplit, {opacity: 0.6}]}><View><Text style={styles.paymentEntity}>ROSEN Treasury Fee</p><Text style={styles.paymentRatio}>10% Agent Service Cost</p></div><Text style={[styles.paymentAmount, {fontSize: 16}]}>+5.00 USDC</Text></div></Animated.View>
                )}
            </View>
        )}
      </ScrollView>

      {/* Static Footer Mock (Based on image_1) */}
      <View style={styles.footer}><View style={styles.navItem}><Text>🪐</Text><Text style={styles.navText}>Planet</Text></View><View style={styles.navItem}><Text>🏛️</Text><Text style={styles.navText}>Plaza</Text></View><View style={[styles.navItem, styles.navActive]}><Text style={{color: ROSEN_BLUE, fontWeight: 'bold'}}>R</Text><Text style={[styles.navText, {color: ROSEN_BLUE}]}>ROSEN</Text></View><View style={styles.navItem}><Text>💬</Text><Text style={styles.navText}>Friends</Text></View><View style={styles.navItem}><Text>👤</Text><Text style={styles.navText}>Me</Text></View></View>

      {/* World ID Mock Modal */}
      <Modal visible={showWorldIDModal} animationType="slide" transparent={true}><View style={styles.modalOverlay}><View style={styles.worldIDModal}><Text style={styles.worldIDModalTitle}>WORLD ID</Text><Text style={styles.worldIDModalDesc}>Please scan with World App to prove your unique personhood.</p><View style={styles.orbMock}><Text style={styles.worldIDVibeIcon}>⭕</Text></View><TouchableOpacity style={styles.worldIDBtn} onPress={onWorldIDSuccess}><Text style={styles.worldIDBtnText}>Verify Human with World ID</Text></TouchableOpacity><TouchableOpacity onPress={() => setShowWorldIDModal(false)}><X color="#999" /></TouchableOpacity></View></View></Modal></View>
  );
}

// --- styles.js 样式表 ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR },
  header: { backgroundColor: ROSEN_BLUE, paddingHorizontal: 20, paddingTop: 50, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, zIndex: 10 },
  statusBarMock: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  timeMock: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  iconMock: { color: 'white', fontSize: 12 },
  appTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginBottom: 4 },
  appDesc: { color: '#DDE3FF', fontSize: 11, marginBottom: 20 },
  verifyBanner: { backgroundColor: 'white', borderRadius: 24, p: 20, flexDir: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 5, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 10 },
  verifyBannerContent: { flex: 1 },
  verifyTitle: { color: ROSEN_BLUE, fontSize: 20, fontWeight: '900', marginBottom: 2 },
  verifyDesc: { color: '#999', fontSize: 10, leadingHeight: 12 },
  mainContent: { flex: 1, backgroundColor: BG_COLOR },
  scrollContent: { p: 20 },
  homeContent: { spaceY: 15 },
  phaseTitle: { fontSize: 18, fontWeight: 'bold', color: 'black', mb: 15 },
  actionCard: { backgroundColor: 'white', p: 15, rounded: 20, flexDir: 'row', alignItems: 'center', spaceX: 10, border: '1px solid #f0f3ff' },
  actionTitle: { fontWeight: 'bold', fontSize: 14, color: ROSEN_BLUE },
  taskCardMock: { backgroundColor: 'white', p: 15, rounded: 20, border: '1px solid #f0f3ff', flexDir: 'row', alignItems: 'center', spaceX: 10 },
  footer: { height: 80, borderTop: '1px solid #f0f0f0', backgroundColor: 'white', flexDir: 'row', justifyContent: 'space-around', alignItems: 'center', pX: 15, zIndex: 10 },
  navItem: { flexDir: 'column', alignItems: 'center' },
  navText: { fontSize: 9, mt: 3, color: '#999' },
  navActive: { fontW: 'bold' },
  // MATCHterminalContainer: { flex: 1, pT: 20, alignItems: 'center' },
  agentAvatarBig: { backgroundColor: '#E2E6FF', w: 70, h: 70, rounded: 35, alignItems: 'center', justifyContent: 'center', mb: 10 },
  matchTitle: { color: ROSEN_BLUE, fontSize: 16, fontW: 'bold', mb: 4 },
  matchDesc: { color: '#aaa', fontSize: 11, mb: 15 },
  terminal: { backgroundColor: 'black', rounded: 20, p: 15, w: '100%', h: 180, mb: 20 },
  terminalText: { color: '#00FF41', fontF: 'monospace', fontSize: 10, mb: 2 },
  primaryBtn: { backgroundColor: ROSEN_BLUE, rounded: 16, pV: 12, pH: 20, elevation: 3 },
  primaryBtnText: { color: 'white', fontSize: 12, fontW: 'bold' },
  // RECS (模仿 image_0)taskCard: { backgroundColor: 'white', rounded: 20, p: 15, flexDir: 'row', alignItems: 'center', spaceX: 10, mb: 12, border: '1px solid #f0f3ff' },
  taskCardHeader: { flexDir: 'row', justifyContent: 'space-between' },
  taskBudget: { color: ROSEN_TAG_ORANGE, fontW: 'bold', fontSize: 14 },
  tag: { pV: 1, pH: 6, rounded: 8 },
  tagText: { color: 'white', fontSize: 8, fontW: 'bold' },
  taskTitle: { color: 'black', fontW: 'bold', fontSize: 13, mt: 2 },
  taskDesc: { color: '#aaa', fontSize: 10, mt: 1 },
  // COLLABchatHeader: { h: 50, borderB: '1px solid #f0f0f0', flexDir: 'row', alignItems: 'center', mb: 15 },
  chatHeaderTitle: { color: 'black', fontW: 'bold', fontSize: 13 },
  bubbleContainer: { flexDir: 'row', alignItems: 'flex-start', mb: 15, spaceX: 8 },
  agentAvatar: { w: 30, h: 30, rounded: 15, backgroundColor: '#E2E6FF', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc' },
  bubble: { p: 12, maxW: '80%', rounded: 18 },
  bubbleMe: { backgroundColor: ROSEN_BLUE, borderBR: 4 },
  bubbleAgent: { backgroundColor: '#E2E6FF', borderBL: 4 },
  translateTag: { pV: 1, pH: 4, rounded: 6, backgroundColor: 'rgba(99,118,255,0.1)' },
  translateTagText: { color: '#1a1a1a', fontSize: 9, fontW: 'bold' },
  paymentBubble: { marginB: 15 },
  rosenListItem: { rounded: 20, p: 15, w: '100%', border: '1px solid #f0f3ff' },
  paymentBubbleHeader: { flexDir: 'row', alignItems: 'center', spaceX: 4, mb: 8 },
  paymentStatus: { color: '#00a822', fontW: 'bold', fontSize: 10, fontF: 'monospace' },
  paymentSplit: { flexDir: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paymentEntity: { color: 'black', fontW: 'bold', fontSize: 12 },
  paymentAmount: { color: 'black', fontW: '900', fontSize: 18 },
  // WORLD IDmodalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', p: 20 },
  worldIDModal: { backgroundColor: 'white', rounded: 40, p: 30, w: '100%', alignItems: 'center', shadowColor: '#000' },
  worldIDModalTitle: { color: 'black', fontSize: 18, fontW: 'bold', mb: 2 },
  worldIDModalDesc: { color: '#aaa', fontSize: 11, mb: 15, textAlign: 'center' },
  orbMock: { w: 100, h: 100, rounded: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', mb: 15, border: '2px solid white', elevation: 5 },
  worldIDVibeIcon: { color: 'white', fontSize: 50, italic: true },
  worldIDBtn: { backgroundColor: 'black', rounded: 16, pV: 15, pH: 20, w: '100%', mb: 10 },
  worldIDBtnText: { color: 'white', fontSize: 12, fontW: 'bold', textAlign: 'center', tracking: 1, textTransform: 'uppercase' },
});