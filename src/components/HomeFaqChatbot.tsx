'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';

interface HomeFaqChatbotProps {
  isOpen: boolean;
  onOpenChange: (open: boolean | ((prev: boolean) => boolean)) => void;
  highlight: boolean;
  onOpenDemo: () => void;
  onJumpToOsStage: (tab: 'business' | 'creator', stage: 1 | 2 | 3 | 4) => void;
}

const FAQS = [
  {
    q: 'How does Bomie AI match local businesses with creators?',
    a: 'Our AI engine analyzes your store location, product category, brand vibe, and target audience demographics against local creators’ content style, engagement authenticity, and neighborhood reach—delivering high-fit matches without cold DMs.',
    actionLabel: 'Explore Merchant Matching →',
    actionType: 'merchant' as const,
  },
  {
    q: 'How does pricing and creator payout work?',
    a: 'Businesses can launch campaigns using flat fees, free product seeding, or performance-based milestones (views, clicks, or in-store redemptions). Funds are held securely in 30% / 40% / 30% escrow and released automatically once deliverables and FTC disclosures are verified.',
    actionLabel: 'Book a Custom Pricing Demo →',
    actionType: 'demo' as const,
  },
  {
    q: 'Does Bomie handle FTC disclosure and compliance?',
    a: 'Yes. Bomie’s 3-Agent Governance Gate automatically audits campaign briefs and verifies that published posts include required FTC 16 CFR Part 255 #ad / #sponsored disclosures before releasing final escrow payouts.',
    actionLabel: 'See 3-Agent FTC Gate →',
    actionType: 'merchant' as const,
  },
  {
    q: 'Do I need a minimum follower count to join as a creator?',
    a: 'No. Local businesses care most about authentic storytelling and neighborhood trust. Nano and micro-creators (even 2K–50K followers) with strong local engagement regularly win paid collaborations on Bomie.',
    actionLabel: 'Try Creator OS →',
    actionType: 'creator' as const,
  },
  {
    q: 'Which platforms are supported for content tracking?',
    a: 'Bomie currently supports automated performance tracking across TikTok, Instagram Reels, and YouTube Shorts, with direct e-commerce, QR voucher, and POS attribution links.',
    actionLabel: 'Book a Live Walkthrough →',
    actionType: 'demo' as const,
  },
];

function generateSmartBotReply(raw: string): {
  text: string;
  actionLabel?: string;
  actionType?: 'demo' | 'merchant' | 'creator';
} {
  const q = raw.toLowerCase();
  const isZh = /[\u4e00-\u9fa5]/.test(raw);

  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('fee') ||
    q.includes('budget') ||
    q.includes('多少钱') ||
    q.includes('收费') ||
    q.includes('价格') ||
    q.includes('预算')
  ) {
    return {
      text: isZh
        ? 'Bomie AI 支持极灵活的预算配置！本地商家可以从 $300–$1,500 的单次社区推广起步，资金采用 30%（签约）/ 40%（脚本过审）/ 30%（发布且 FTC 合规验证后）智能托管结算，零隐形费用。'
        : 'Bomie AI is built for local budgets! Most neighborhood campaigns start between $300 and $1,500 with 30% / 40% / 30% milestone escrow protection—you only release final payout once verified content is live.',
      actionLabel: isZh ? '预约 1 对 1 报价演示 →' : 'Book a Pricing Walkthrough →',
      actionType: 'demo',
    };
  }

  if (
    q.includes('city') ||
    q.includes('cities') ||
    q.includes('where') ||
    q.includes('sf') ||
    q.includes('la') ||
    q.includes('seattle') ||
    q.includes('vegas') ||
    q.includes('城市') ||
    q.includes('地区') ||
    q.includes('哪里')
  ) {
    return {
      text: isZh
        ? '我们目前已全面覆盖北美核心文化与商业枢纽（旧金山 San Francisco、洛杉矶 Los Angeles、西雅图 Seattle、拉斯维加斯 Las Vegas 等），并支持全美 4,000 万+ 中小商家与本地达人按邮编与英里半径精准匹配！'
        : 'We are live across North America’s major cultural hubs—including San Francisco, Los Angeles, Seattle, and Las Vegas—matching businesses and creators within a 0.5 to 15-mile neighborhood radius.',
      actionLabel: isZh ? '预约城市专属方案 →' : 'Book a City Launch Demo →',
      actionType: 'demo',
    };
  }

  if (
    q.includes('creator') ||
    q.includes('influencer') ||
    q.includes('follower') ||
    q.includes('tiktok') ||
    q.includes('达人') ||
    q.includes('博主') ||
    q.includes('粉丝') ||
    q.includes('提现')
  ) {
    return {
      text: isZh
        ? '作为本地达人（Creator），哪怕你是 2K–50K 粉丝的 KOC/Nano 达人，只要本地互动真实，就能收到附近餐厅、美学 Spa、精品店的付费邀请！自带 AI 30 秒脚本助手，发布即通过 Stripe / Apple Pay 秒级提现。'
        : 'Creators love Bomie Creator OS! You don’t need millions of followers—nano & micro creators (2K–50K) get direct paid invites from nearby restaurants, spas, and boutiques with instant Stripe / Apple Pay payouts.',
      actionLabel: isZh ? '体验达人工作台 →' : 'Try Creator OS →',
      actionType: 'creator',
    };
  }

  if (
    q.includes('ftc') ||
    q.includes('compliance') ||
    q.includes('legal') ||
    q.includes('escrow') ||
    q.includes('合规') ||
    q.includes('担保') ||
    q.includes('安全')
  ) {
    return {
      text: isZh
        ? 'Bomie 内置三智能体合规网关（3-Agent Governance Gate）：自动扫描医疗夸大词、强制校验 FTC #ad 标签与商业曲库授权，合规通过后才释放尾款，帮商家和达人 100% 规避法律与封号风险。'
        : 'Our 3-Agent Governance Gate automatically checks FTC 16 CFR Part 255 disclosures (#ad / #sponsored), medical/category claims, and commercial audio licensing before releasing final escrow funds.',
      actionLabel: isZh ? '查看合规沙盒演示 →' : 'Test FTC Gate in Sandbox →',
      actionType: 'merchant',
    };
  }

  if (
    q.includes('demo') ||
    q.includes('human') ||
    q.includes('contact') ||
    q.includes('book') ||
    q.includes('预约') ||
    q.includes('联系') ||
    q.includes('客服') ||
    q.includes('合作')
  ) {
    return {
      text: isZh
        ? '太棒了！你可以直接点击下方按钮预约我们创始团队的 15 分钟 1-on-1 专属演示，或者发送邮件至 lucian.wang@bomie.ai，我们会在 24 小时内为你定制本地增长方案！'
        : 'We’d love to show you around! Click below to schedule a 15-minute 1-on-1 walkthrough with our founding team, or email us directly at lucian.wang@bomie.ai.',
      actionLabel: isZh ? '立即预约 Demo →' : 'Book a 1-on-1 Demo →',
      actionType: 'demo',
    };
  }

  return {
    text: isZh
      ? `收到你的问题！Bomie AI 通过「AI 同城精准匹配 + 4 阶段全自动活动编排 + 内置 FTC 合规与托管结算」连接北美本地商家与达人。你可以点击下方按钮体验交互式工作台，或直接预约 1 对 1 演示！`
      : `Great question! Bomie AI connects local businesses and neighborhood creators within miles—combining AI smart matching, 30s script co-creation, FTC compliance verification, and tracked in-store QR attribution. Would you like to see a live demo for your store or creator profile?`,
    actionLabel: isZh ? '预约 1 对 1 专属演示 →' : 'Book a Live Demo →',
    actionType: 'demo',
  };
}

export default function HomeFaqChatbot({
  isOpen,
  onOpenChange,
  highlight,
  onOpenDemo,
  onJumpToOsStage,
}: HomeFaqChatbotProps) {
  const [isChatHovered, setIsChatHovered] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<
    {
      id: string;
      sender: 'bot' | 'user';
      text: string;
      actionLabel?: string;
      actionType?: 'demo' | 'merchant' | 'creator';
    }[]
  >([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi! 👋 I’m Bomie AI Concierge. Tap any of our 5 popular FAQ topics below, or type any question about local campaigns, pricing, creators, or FTC compliance!',
    },
  ]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isBotTyping, isOpen]);

  // Auto-collapse chatbot after 4 seconds of inactivity (pause while hovered or typing)
  useEffect(() => {
    if (!isOpen || isChatHovered || isBotTyping || chatInput.trim().length > 0) return;
    const timer = setTimeout(() => {
      onOpenChange(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen, isChatHovered, isBotTyping, chatInput, chatMessages.length, onOpenChange]);

  const handleSelectFaqTopic = (faqItem: (typeof FAQS)[number]) => {
    const userMsgId = `u-${Date.now()}`;
    setChatMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: faqItem.q }]);
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: faqItem.a,
          actionLabel: faqItem.actionLabel,
          actionType: faqItem.actionType,
        },
      ]);
    }, 450);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    const userMsgId = `u-${Date.now()}`;
    setChatMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: trimmed }]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const reply = generateSmartBotReply(trimmed);
      setIsBotTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: reply.text,
          actionLabel: reply.actionLabel,
          actionType: reply.actionType,
        },
      ]);
    }, 520);
  };

  return (
    <div
      onMouseEnter={() => setIsChatHovered(true)}
      onMouseLeave={() => setIsChatHovered(false)}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.22 }}
            className={`flex h-[520px] max-h-[82vh] w-[calc(100vw-2.5rem)] sm:w-[400px] flex-col overflow-hidden rounded-3xl border bg-white/95 shadow-2xl backdrop-blur-2xl ${
              highlight
                ? 'border-violet-400 ring-2 ring-violet-400/35 shadow-violet-500/20'
                : 'border-violet-200/90 shadow-violet-950/15'
            }`}
          >
            {/* Chatbot Header */}
            <div className="flex items-center justify-between border-b border-violet-200/80 bg-gradient-to-r from-[#f7f4ff] via-white to-[#fdf4ff] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-md shadow-violet-500/25">
                  <svg viewBox="0 0 512 512" fill="none" className="h-6 w-6">
                    <path
                      fill="#ffffff"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
                    />
                    <path
                      fill="#fef08a"
                      d="M396 76C399.5 103.5 412.5 116.5 440 120C412.5 123.5 399.5 136.5 396 164C392.5 136.5 379.5 123.5 352 120C379.5 116.5 392.5 103.5 396 76Z"
                    />
                  </svg>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-[#161224]">Bomie AI Concierge</span>
                    <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 border border-violet-200">
                      FAQ Bot
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online · 5 FAQ Topics &amp; Live Chat</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-lg border border-violet-200 bg-white p-1.5 text-slate-500 transition hover:bg-violet-50 hover:text-[#161224]"
                aria-label="Close Bomie AI Chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Pre-stored 5 FAQ Topic Pills */}
            <div className="border-b border-violet-100 bg-[#f7f4ff]/70 px-3.5 py-2.5">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                  Quick FAQ Topics (Tap to Ask)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {FAQS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectFaqTopic(item)}
                    className="rounded-full border border-violet-200 bg-white px-2.5 py-1 text-left text-[11px] font-medium text-slate-700 shadow-xs transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-950"
                  >
                    {item.q.length > 38 ? `${item.q.slice(0, 36)}…` : item.q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Conversation Stream */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto bg-[#faf8ff] px-4 py-3.5 space-y-3"
            >
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white rounded-br-sm shadow-sm'
                        : 'border border-violet-200/80 bg-white text-slate-700 rounded-bl-sm shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.sender === 'bot' && msg.actionLabel && (
                      <button
                        type="button"
                        onClick={() => {
                          if (msg.actionType === 'demo') {
                            onOpenDemo();
                          } else if (msg.actionType === 'merchant') {
                            onOpenChange(false);
                            onJumpToOsStage('business', 1);
                          } else if (msg.actionType === 'creator') {
                            onOpenChange(false);
                            onJumpToOsStage('creator', 1);
                          }
                        }}
                        className="mt-2 inline-flex items-center gap-1 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-800 transition hover:bg-violet-100"
                      >
                        <span>{msg.actionLabel}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-violet-200/80 bg-white px-3.5 py-2.5 shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce" />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendChatMessage}
              className="flex items-center gap-2 border-t border-violet-200/80 bg-white p-3"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything about pricing, cities, creators..."
                className="flex-1 rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2 text-xs text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white shadow-md transition hover:opacity-90 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bomie B✦ Logo Launcher Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => onOpenChange((prev) => !prev)}
        className="group relative flex items-center gap-2.5 rounded-full border border-violet-200/90 bg-white/95 p-1.5 sm:pr-4 shadow-xl shadow-violet-900/15 backdrop-blur-xl transition hover:border-violet-400 cursor-pointer"
        aria-label="Open Bomie AI FAQ Chatbot"
      >
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-lg shadow-violet-500/30">
          {isOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <svg viewBox="0 0 512 512" fill="none" className="h-7 w-7">
              <path
                fill="#ffffff"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
              />
              <path
                fill="#fef08a"
                d="M396 76C399.5 103.5 412.5 116.5 440 120C412.5 123.5 399.5 136.5 396 164C392.5 136.5 379.5 123.5 352 120C379.5 116.5 392.5 103.5 396 76Z"
              />
            </svg>
          )}
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
        </span>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-extrabold text-[#161224] flex items-center gap-1">
            <Bot className="h-3 w-3 text-violet-600" />
            Ask Bomie AI
          </span>
          <span className="text-[10px] font-medium text-slate-500">FAQ &amp; Live Answers</span>
        </div>
      </motion.button>
    </div>
  );
}
