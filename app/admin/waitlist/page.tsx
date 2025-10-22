'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Clock, Mail, Phone, Building2, TrendingUp, ExternalLink } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  user_type: 'founder' | 'investor';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  // Founder fields
  startup_name?: string;
  business_idea?: string;
  startup_stage?: string;
  industry?: string;
  funding_target?: number;
  team_size?: number;
  website_url?: string;
  // Investor fields
  investor_type?: string;
  investment_range_min?: number;
  investment_range_max?: number;
  investment_experience?: string;
  linkedin_url?: string;
  // Approval fields
  otp_code?: string;
  otp_verified?: boolean;
  rejection_reason?: string;
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchEntries(activeTab);
  }, [activeTab]);

  const fetchEntries = async (status: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/waitlist?status=${status}`);
      const data = await response.json();
      
      if (response.ok) {
        setEntries(data.data || []);
      } else {
        toast.error(data.error || 'Failed to fetch waitlist entries');
      }
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      toast.error('Failed to fetch waitlist entries');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (entry: WaitlistEntry) => {
    if (!confirm(`Approve ${entry.full_name}? An OTP will be sent to their email.`)) {
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch('/api/admin/waitlist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: entry.id,
          action: 'approve'
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`${entry.full_name} has been approved! OTP sent to ${entry.email}`);
        fetchEntries(activeTab);
      } else {
        toast.error(data.error || 'Failed to approve entry');
      }
    } catch (error) {
      console.error('Error approving entry:', error);
      toast.error('Failed to approve entry');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedEntry) return;

    setActionLoading(true);
    try {
      const response = await fetch('/api/admin/waitlist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedEntry.id,
          action: 'reject',
          rejection_reason: rejectionReason
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`${selectedEntry.full_name} has been rejected`);
        setShowRejectDialog(false);
        setRejectionReason('');
        setSelectedEntry(null);
        fetchEntries(activeTab);
      } else {
        toast.error(data.error || 'Failed to reject entry');
      }
    } catch (error) {
      console.error('Error rejecting entry:', error);
      toast.error('Failed to reject entry');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderEntryCard = (entry: WaitlistEntry) => (
    <Card key={entry.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {entry.user_type === 'founder' ? (
                <Building2 className="w-5 h-5 text-blue-500" />
              ) : (
                <TrendingUp className="w-5 h-5 text-purple-500" />
              )}
              {entry.full_name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{entry.user_type}</p>
          </div>
          {getStatusBadge(entry.status)}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{entry.email}</span>
          </div>
          {entry.phone_number && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{entry.phone_number}</span>
            </div>
          )}
        </div>

        {entry.user_type === 'founder' && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">{entry.startup_name}</h4>
            <p className="text-sm text-gray-700 mb-3">{entry.business_idea}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {entry.startup_stage && (
                <div>
                  <span className="text-gray-500">Stage:</span>{' '}
                  <span className="font-medium capitalize">{entry.startup_stage.replace('_', ' ')}</span>
                </div>
              )}
              {entry.industry && (
                <div>
                  <span className="text-gray-500">Industry:</span>{' '}
                  <span className="font-medium">{entry.industry}</span>
                </div>
              )}
              {entry.funding_target && (
                <div>
                  <span className="text-gray-500">Target:</span>{' '}
                  <span className="font-medium">{formatCurrency(entry.funding_target)}</span>
                </div>
              )}
              {entry.team_size && (
                <div>
                  <span className="text-gray-500">Team:</span>{' '}
                  <span className="font-medium">{entry.team_size} members</span>
                </div>
              )}
            </div>
            {entry.website_url && (
              <a
                href={entry.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-2"
              >
                Visit Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {entry.user_type === 'investor' && (
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {entry.investor_type && (
                <div>
                  <span className="text-gray-500">Type:</span>{' '}
                  <span className="font-medium capitalize">{entry.investor_type.replace('_', ' ')}</span>
                </div>
              )}
              {entry.investment_experience && (
                <div>
                  <span className="text-gray-500">Experience:</span>{' '}
                  <span className="font-medium capitalize">{entry.investment_experience}</span>
                </div>
              )}
              {entry.investment_range_min && (
                <div className="col-span-2">
                  <span className="text-gray-500">Investment Range:</span>{' '}
                  <span className="font-medium">
                    {formatCurrency(entry.investment_range_min)} - {formatCurrency(entry.investment_range_max)}
                  </span>
                </div>
              )}
            </div>
            {entry.linkedin_url && (
              <a
                href={entry.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline text-sm flex items-center gap-1 mt-2"
              >
                View LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {entry.status === 'approved' && entry.otp_code && (
          <div className="bg-green-50 p-3 rounded text-sm mb-4">
            <span className="text-gray-600">OTP:</span>{' '}
            <code className="bg-white px-2 py-1 rounded font-mono">{entry.otp_code}</code>
            {entry.otp_verified && (
              <Badge className="ml-2 bg-green-600">Verified</Badge>
            )}
          </div>
        )}

        {entry.rejection_reason && (
          <div className="bg-red-50 p-3 rounded text-sm mb-4">
            <span className="text-gray-600">Rejection Reason:</span>{' '}
            <p className="mt-1">{entry.rejection_reason}</p>
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
          <span>Applied: {formatDate(entry.created_at)}</span>
          
          {entry.status === 'pending' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleApprove(entry)}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setSelectedEntry(entry);
                  setShowRejectDialog(true);
                }}
                disabled={actionLoading}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Waitlist Management</h1>
        <p className="text-gray-600">Review and approve applications to join Incubazar</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No {activeTab} entries found</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {entries.map(entry => renderEntryCard(entry))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting {selectedEntry?.full_name}'s application
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="rejection_reason">Rejection Reason</Label>
            <Textarea
              id="rejection_reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Application incomplete, does not meet criteria..."
              rows={4}
              className="mt-2"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectionReason('');
                setSelectedEntry(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={actionLoading || !rejectionReason.trim()}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

